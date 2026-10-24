using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NarayanixConnect.Api.Entities;

namespace NarayanixConnect.Api.Data;

/// <summary>
/// EF Core context for the NARAYANIX Connect database objects.
/// Every table here uses the shared-database prefix "nrx_con_" (see docs/DATABASE.md).
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<AdminPermission> AdminPermissions => Set<AdminPermission>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Proposal> Proposals => Set<Proposal>();
    public DbSet<Setting> Settings => Set<Setting>();
    public DbSet<WebsiteContent> WebsiteContents => Set<WebsiteContent>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // All DateTime columns: datetime2, always read back as UTC.
        configurationBuilder.Properties<DateTime>()
            .HaveColumnType("datetime2")
            .HaveConversion<UtcDateTimeConverter>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(e =>
        {
            e.ToTable("nrx_con_admin");
            e.HasKey(x => x.Id).HasName("PK_nrx_con_admin");
            e.Property(x => x.Name).HasMaxLength(100).IsRequired();
            e.Property(x => x.Email).HasMaxLength(256); // optional contact email
            e.Property(x => x.PasswordHash).HasMaxLength(255).IsRequired();
            e.Property(x => x.Role).HasMaxLength(30).IsRequired();
            // Login ID, e.g. NRXCON0001: derived from Id by SQL Server (persisted), so it is
            // unique, never reused and always matches the row. Falls back to more digits after 9999.
            e.Property(x => x.UserCode)
                .HasMaxLength(20)
                .HasComputedColumnSql(
                    "CASE WHEN [Id] < 10000 THEN 'NRXCON' + RIGHT('0000' + CONVERT(varchar(10), [Id]), 4) " +
                    "ELSE 'NRXCON' + CONVERT(varchar(10), [Id]) END",
                    stored: true);
            // Email is optional; unique only among the rows that have one.
            e.HasIndex(x => x.Email).IsUnique().HasFilter("[Email] IS NOT NULL").HasDatabaseName("UQ_nrx_con_admin_Email");
            e.HasIndex(x => x.UserCode).IsUnique().HasDatabaseName("UQ_nrx_con_admin_UserCode");
        });

        modelBuilder.Entity<AdminPermission>(e =>
        {
            e.ToTable("nrx_con_admin_permission");
            e.HasKey(x => x.Id).HasName("PK_nrx_con_admin_permission");
            e.Property(x => x.PermissionKey).HasMaxLength(50).IsRequired();
            e.HasIndex(x => new { x.AdminId, x.PermissionKey })
                .IsUnique()
                .HasDatabaseName("UQ_nrx_con_admin_permission_AdminId_PermissionKey");
            e.HasOne(x => x.Admin)
                .WithMany(a => a.Permissions)
                .HasForeignKey(x => x.AdminId)
                .HasConstraintName("FK_nrx_con_admin_permission_nrx_con_admin")
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Contact>(e =>
        {
            e.ToTable("nrx_con_contact");
            e.HasKey(x => x.Id).HasName("PK_nrx_con_contact");
            e.Property(x => x.Name).HasMaxLength(150).IsRequired();
            e.Property(x => x.Company).HasMaxLength(200).IsRequired();
            e.Property(x => x.Email).HasMaxLength(256).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(30).IsRequired();
            e.Property(x => x.Message).HasMaxLength(4000).IsRequired();
            e.HasIndex(x => x.CreatedAt).HasDatabaseName("IX_nrx_con_contact_CreatedAt");
        });

        modelBuilder.Entity<Proposal>(e =>
        {
            e.ToTable("nrx_con_proposal");
            e.HasKey(x => x.Id).HasName("PK_nrx_con_proposal");
            e.Property(x => x.Company).HasMaxLength(200).IsRequired();
            e.Property(x => x.Name).HasMaxLength(150).IsRequired();
            e.Property(x => x.Email).HasMaxLength(256).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(30).IsRequired();
            e.Property(x => x.Website).HasMaxLength(500).IsRequired();
            e.Property(x => x.Service).HasMaxLength(150).IsRequired();
            e.Property(x => x.Budget).HasMaxLength(100).IsRequired();
            e.Property(x => x.Message).HasMaxLength(4000).IsRequired();
            e.HasIndex(x => x.CreatedAt).HasDatabaseName("IX_nrx_con_proposal_CreatedAt");
        });

        modelBuilder.Entity<Setting>(e =>
        {
            // Singleton table: one row, Id is always 1 (not identity).
            e.ToTable("nrx_con_setting", t => t.HasCheckConstraint("CK_nrx_con_setting_Singleton", "[Id] = 1"));
            e.HasKey(x => x.Id).HasName("PK_nrx_con_setting");
            e.Property(x => x.Id).ValueGeneratedNever();

            e.Property(x => x.CompanyName).HasMaxLength(200).IsRequired();
            e.Property(x => x.Email).HasMaxLength(256).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(50).IsRequired();
            e.Property(x => x.Address).HasMaxLength(500).IsRequired();
            e.Property(x => x.WorkingHours).HasMaxLength(200).IsRequired();
            e.Property(x => x.Logo).HasMaxLength(500).IsRequired();
            e.Property(x => x.Favicon).HasMaxLength(500).IsRequired();
            e.Property(x => x.Facebook).HasMaxLength(500).IsRequired();
            e.Property(x => x.Linkedin).HasMaxLength(500).IsRequired();
            e.Property(x => x.Instagram).HasMaxLength(500).IsRequired();
            e.Property(x => x.Youtube).HasMaxLength(500).IsRequired();
            e.Property(x => x.Whatsapp).HasMaxLength(200).IsRequired();
            e.Property(x => x.Copyright).HasMaxLength(200).IsRequired();
            // May hold an embed/script snippet, so no length limit.
            e.Property(x => x.GoogleMap).HasColumnType("nvarchar(max)").IsRequired();
            e.Property(x => x.Analytics).HasColumnType("nvarchar(max)").IsRequired();
        });

        modelBuilder.Entity<WebsiteContent>(e =>
        {
            e.ToTable("nrx_con_website_content",
                t => t.HasCheckConstraint("CK_nrx_con_website_content_ContentJson", "ISJSON([ContentJson]) = 1"));
            e.HasKey(x => x.Id).HasName("PK_nrx_con_website_content");
            e.Property(x => x.SectionKey).HasMaxLength(100).IsRequired();
            e.Property(x => x.ContentJson).HasColumnType("nvarchar(max)").IsRequired();
            e.HasIndex(x => x.SectionKey).IsUnique().HasDatabaseName("UQ_nrx_con_website_content_SectionKey");
        });
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        ApplyTimestamps();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        ApplyTimestamps();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void ApplyTimestamps()
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
                entry.Entity.UpdatedAt = now;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = now;
                entry.Property(x => x.CreatedAt).IsModified = false;
            }
        }
    }
}

/// <summary>SQL Server datetime2 has no kind; we always store UTC and read it back as UTC.</summary>
internal sealed class UtcDateTimeConverter : ValueConverter<DateTime, DateTime>
{
    public UtcDateTimeConverter()
        : base(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
    {
    }
}
