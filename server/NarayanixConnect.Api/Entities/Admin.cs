using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Entities;

/// <summary>Table: nrx_con_admin — Super Admins and Staff users of the admin panel.</summary>
public class Admin : BaseEntity
{
    public string Name { get; set; } = "Administrator";

    /// <summary>Optional contact email (unique when present). The login ID is <see cref="UserCode"/>.</summary>
    public string? Email { get; set; }

    /// <summary>Login ID such as NRXCON0001 — computed by the database from Id (never set in code).</summary>
    public string UserCode { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = AdminRoles.Staff;

    public bool IsActive { get; set; } = true;

    /// <summary>True for new/reset accounts: the user must choose their own password at first login.</summary>
    public bool MustChangePassword { get; set; }

    public List<AdminPermission> Permissions { get; set; } = new();
}
