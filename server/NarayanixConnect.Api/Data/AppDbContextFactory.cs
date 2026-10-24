using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace NarayanixConnect.Api.Data;

/// <summary>
/// Used only by EF Core tools (Add-Migration / Update-Database). It builds the context from
/// appsettings.json + user-secrets + environment variables WITHOUT starting the web app,
/// so migrations never trigger startup seeding or the JWT/CORS configuration checks.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true)
            .AddUserSecrets<AppDbContextFactory>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connectionString = configuration.GetConnectionString("Default");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "ConnectionStrings:Default is not set. Add it with Manage User Secrets (see docs/DATABASE.md).");
        }

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(connectionString, sql => sql.MigrationsHistoryTable("nrx_con_migrations_history"))
            .Options;

        return new AppDbContext(options);
    }
}
