namespace NarayanixConnect.Api.Entities;

/// <summary>Table: nrx_con_admin_permission — one row per permission ticked for a Staff user.</summary>
public class AdminPermission : BaseEntity
{
    public int AdminId { get; set; }
    public Admin Admin { get; set; } = null!;

    public string PermissionKey { get; set; } = string.Empty;
}
