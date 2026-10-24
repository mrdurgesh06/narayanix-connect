using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Options;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Data;

public static class DbSeeder
{
    /// <summary>
    /// Creates the first admin (from Seed:AdminEmail / Seed:AdminPassword) and the default
    /// settings row if they do not exist. Never throws: if the database is unreachable or the
    /// migrations were not applied yet, it logs a warning and the API still starts.
    /// </summary>
    public static async Task SeedAsync(IServiceProvider services, ILogger logger)
    {
        try
        {
            using var scope = services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var seed = scope.ServiceProvider.GetRequiredService<IOptions<SeedOptions>>().Value;

            if (!await db.Admins.AnyAsync())
            {
                if (string.IsNullOrWhiteSpace(seed.AdminEmail) || string.IsNullOrWhiteSpace(seed.AdminPassword))
                {
                    logger.LogWarning(
                        "No admin exists and Seed:AdminEmail / Seed:AdminPassword are not set. No admin was created.");
                }
                else if (seed.AdminPassword.Length < 8)
                {
                    logger.LogWarning("Seed:AdminPassword must be at least 8 characters. No admin was created.");
                }
                else
                {
                    var email = seed.AdminEmail.Trim().ToLowerInvariant();

                    db.Admins.Add(new Admin
                    {
                        Name = "Administrator",
                        Email = email,
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(seed.AdminPassword),
                        Role = AdminRoles.SuperAdmin,
                        IsActive = true
                    });

                    await db.SaveChangesAsync();
                    logger.LogInformation("Super Admin created: {Email}", email);
                }
            }

            // Accounts that existed before roles were introduced have an empty Role / IsActive = false.
            // Make sure there is always at least one active Super Admin: promote the oldest account.
            if (!await db.Admins.AnyAsync(a => a.Role == AdminRoles.SuperAdmin))
            {
                var first = await db.Admins.OrderBy(a => a.Id).FirstOrDefaultAsync();
                if (first is not null)
                {
                    first.Role = AdminRoles.SuperAdmin;
                    first.IsActive = true;
                    await db.SaveChangesAsync();
                    logger.LogInformation("Existing admin {UserCode} was promoted to Super Admin.", first.UserCode);
                }
            }

            if (!await db.Settings.AnyAsync())
            {
                db.Settings.Add(new Setting { Id = Setting.SingletonId });
                await db.SaveChangesAsync();
                logger.LogInformation("Default settings row created.");
            }
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex,
                "Database seeding skipped. If the tables do not exist yet, run Update-Database and restart.");
        }
    }
}
