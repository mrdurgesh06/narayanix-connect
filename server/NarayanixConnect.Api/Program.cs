using System.Security.Claims;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Options;
using NarayanixConnect.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// ------------------------------------------------------------------
// Required configuration (secrets come from user-secrets / env vars,
// see docs/DATABASE.md §6). Fail fast with a clear message.
// ------------------------------------------------------------------
var connectionString = config.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "ConnectionStrings:Default is not configured. Set it with 'Manage User Secrets' (development) " +
        "or the ConnectionStrings__Default environment variable (production).");
}

var jwt = config.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();
if (string.IsNullOrWhiteSpace(jwt.Secret) || jwt.Secret.Length < 32)
{
    throw new InvalidOperationException(
        "Jwt:Secret is missing or shorter than 32 characters. Set a long random value in user-secrets / Jwt__Secret.");
}

builder.Services.Configure<JwtOptions>(config.GetSection("Jwt"));
builder.Services.Configure<EmailOptions>(config.GetSection("Email"));
builder.Services.Configure<SeedOptions>(config.GetSection("Seed"));

// ------------------------------------------------------------------
// Uploads folder (served at /uploads)
// ------------------------------------------------------------------
var configuredUploadsPath = config["Uploads:Path"];
var uploadsPath = string.IsNullOrWhiteSpace(configuredUploadsPath)
    ? Path.Combine(builder.Environment.ContentRootPath, "uploads")
    : Path.GetFullPath(configuredUploadsPath, builder.Environment.ContentRootPath);
Directory.CreateDirectory(uploadsPath);
builder.Services.AddSingleton(new UploadSettings(uploadsPath));

// ------------------------------------------------------------------
// Database (EF Core + SQL Server). Shared DB: own migrations-history table.
// Retry on failure covers the Azure SQL free tier waking up from auto-pause.
// ------------------------------------------------------------------
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString, sql =>
    {
        sql.MigrationsHistoryTable("nrx_con_migrations_history");
        sql.EnableRetryOnFailure(maxRetryCount: 5, maxRetryDelay: TimeSpan.FromSeconds(10), errorNumbersToAdd: null);
    }));

// ------------------------------------------------------------------
// Services
// ------------------------------------------------------------------
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<IEmailService, EmailService>();

// ------------------------------------------------------------------
// Authentication (JWT) — same flow as the old Node API
// ------------------------------------------------------------------
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret)),
            ValidateIssuer = true,
            ValidIssuer = jwt.Issuer,
            ValidateAudience = true,
            ValidAudience = jwt.Audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1)
        };

        options.Events = new JwtBearerEvents
        {
            // On EVERY request the user is re-read from the database: a deleted or deactivated account
            // is cut off immediately, and role / permission changes apply without logging in again.
            OnTokenValidated = async context =>
            {
                var idText = context.Principal?.FindFirst("id")?.Value;
                var db = context.HttpContext.RequestServices.GetRequiredService<AppDbContext>();

                if (!int.TryParse(idText, out var adminId))
                {
                    context.Fail("Invalid token.");
                    return;
                }

                var admin = await db.Admins.AsNoTracking()
                    .Where(a => a.Id == adminId)
                    .Select(a => new
                    {
                        a.IsActive,
                        a.Role,
                        a.MustChangePassword,
                        Permissions = a.Permissions.Select(p => p.PermissionKey).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (admin is null || !admin.IsActive)
                {
                    context.Fail("Admin not found or disabled.");
                    return;
                }

                var identity = context.Principal?.Identities.FirstOrDefault();
                if (identity is null)
                {
                    context.Fail("Invalid token.");
                    return;
                }

                identity.AddClaim(new Claim(ClaimTypes.Role, admin.Role));
                foreach (var permission in admin.Permissions)
                {
                    identity.AddClaim(new Claim("perm", permission));
                }

                if (admin.MustChangePassword)
                {
                    identity.AddClaim(new Claim("mustChangePassword", "true"));
                }
            },
            // JSON 401 instead of an empty response, in the same shape as every other error.
            OnChallenge = async context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;

                var hasHeader = context.Request.Headers.Authorization.Count > 0;
                await context.Response.WriteAsJsonAsync(new
                {
                    success = false,
                    message = hasHeader
                        ? "Session expired or invalid. Please log in again."
                        : "Not authorized. Please log in."
                });
            }
        };
    });

builder.Services.AddAuthorization();

// ------------------------------------------------------------------
// CORS (origins come from configuration: Cors:AllowedOrigins)
// ------------------------------------------------------------------
var allowedOrigins = config.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

// ------------------------------------------------------------------
// Rate limiting: 100 requests / 15 min / IP overall (as before),
// and a much stricter limit on the admin login endpoint.
// ------------------------------------------------------------------
static string ClientKey(HttpContext context) => context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.OnRejected = async (context, cancellationToken) =>
    {
        await context.HttpContext.Response.WriteAsJsonAsync(
            new { success = false, message = "Too many requests. Please try again later." },
            cancellationToken);
    };

    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(ClientKey(context), _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 100,
            Window = TimeSpan.FromMinutes(15),
            QueueLimit = 0
        }));

    options.AddPolicy("login", context =>
        RateLimitPartition.GetFixedWindowLimiter(ClientKey(context), _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 10,
            Window = TimeSpan.FromMinutes(15),
            QueueLimit = 0
        }));
});

// Behind a reverse proxy (Render, Azure, IIS...) the real client IP / scheme come from X-Forwarded-*.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    // Cloud platforms do not publish fixed proxy IPs, so we trust the platform's proxy.
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services.AddResponseCompression();

builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // We return our own { success, message } validation errors.
        options.SuppressModelStateInvalidFilter = true;
    });

// ==================================================================
var app = builder.Build();
// ==================================================================

app.UseForwardedHeaders();

app.UseExceptionHandler(errorApp => errorApp.Run(async context =>
{
    var feature = context.Features.Get<IExceptionHandlerFeature>();
    if (feature is not null)
    {
        app.Logger.LogError(feature.Error, "Unhandled exception");
    }

    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
    await context.Response.WriteAsJsonAsync(new { success = false, message = "Something went wrong. Please try again." });
}));

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// Basic security headers (the Node app used helmet).
app.Use(async (context, next) =>
{
    var headers = context.Response.Headers;
    headers["X-Content-Type-Options"] = "nosniff";
    headers["X-Frame-Options"] = "DENY";
    headers["Referrer-Policy"] = "no-referrer";
    await next();
});

app.UseResponseCompression();

// Uploaded logo/favicon. Served before the rate limiter so page images never use up the quota.
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads",
    OnPrepareResponse = context =>
    {
        // The React site (another origin) must be allowed to display these images.
        context.Context.Response.Headers["Cross-Origin-Resource-Policy"] = "cross-origin";
    }
});

app.UseCors();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// A user with a temporary password (new account / password reset) may only call "me" and
// "change-password" until they have chosen their own password.
app.Use(async (context, next) =>
{
    if (context.User.HasClaim("mustChangePassword", "true"))
    {
        var path = context.Request.Path.Value ?? string.Empty;
        var allowed =
            string.Equals(path, "/api/admin/me", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(path, "/api/admin/change-password", StringComparison.OrdinalIgnoreCase);

        if (!allowed)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new
            {
                success = false,
                code = "PASSWORD_CHANGE_REQUIRED",
                message = "Please change your temporary password to continue."
            });
            return;
        }
    }

    await next();
});

app.MapControllers();

// Health check (the old Node app answered on "/"; the SEO phase will serve the React app there).
app.MapGet("/", () => Results.Json(new { success = true, message = "🚀 NARAYANIX Connect API Running Successfully" }));
app.MapGet("/api/health", () => Results.Json(new { success = true, status = "ok" }));

// Unknown /api/* routes → JSON 404 (same message as the Node API).
app.MapFallback("/api/{**path}", async context =>
{
    context.Response.StatusCode = StatusCodes.Status404NotFound;
    await context.Response.WriteAsJsonAsync(new { success = false, message = "API Route Not Found" });
});

// Create the first admin + default settings once the app is listening. It runs in the background so a
// sleeping database (Azure SQL free tier) can never delay startup or fail a Render health check; the
// seeder never throws (it only logs a warning).
app.Lifetime.ApplicationStarted.Register(() =>
{
    _ = Task.Run(() => DbSeeder.SeedAsync(app.Services, app.Logger));
});

app.Run();
