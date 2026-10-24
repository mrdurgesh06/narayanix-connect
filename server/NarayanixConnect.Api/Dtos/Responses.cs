using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Dtos;

// The React client expects `id` as a STRING (it was a Mongo ObjectId) and camelCase names.
// System.Text.Json's web defaults give camelCase; Id is converted to string here.

public record AdminDto(
    string Id, string UserCode, string Name, string? Email, string Role, bool IsActive,
    bool MustChangePassword, IReadOnlyList<string> Permissions, DateTime CreatedAt, DateTime UpdatedAt);

public record ContactDto(
    string Id, string Name, string Company, string Email, string Phone, string Message,
    DateTime CreatedAt, DateTime UpdatedAt);

public record ProposalDto(
    string Id, string Company, string Name, string Email, string Phone, string Website,
    string Service, string Budget, string Message, DateTime CreatedAt, DateTime UpdatedAt);

public record SettingDto(
    string Id, string CompanyName, string Email, string Phone, string Address, string WorkingHours,
    string Logo, string Favicon, string Facebook, string Linkedin, string Instagram, string Youtube,
    string Whatsapp, string Copyright, string GoogleMap, string Analytics,
    DateTime CreatedAt, DateTime UpdatedAt);

public static class DtoMapping
{
    /// <summary>Requires a.Permissions to be loaded (Include). Super Admin gets every permission key.</summary>
    public static AdminDto ToDto(this Admin a) =>
        new(a.Id.ToString(), a.UserCode, a.Name, a.Email, a.Role, a.IsActive, a.MustChangePassword,
            a.Role == AdminRoles.SuperAdmin
                ? PermissionCatalog.AllKeys
                : a.Permissions.Select(p => p.PermissionKey).OrderBy(k => k, StringComparer.Ordinal).ToList(),
            a.CreatedAt, a.UpdatedAt);

    public static ContactDto ToDto(this Contact c) =>
        new(c.Id.ToString(), c.Name, c.Company, c.Email, c.Phone, c.Message, c.CreatedAt, c.UpdatedAt);

    public static ProposalDto ToDto(this Proposal p) =>
        new(p.Id.ToString(), p.Company, p.Name, p.Email, p.Phone, p.Website, p.Service, p.Budget,
            p.Message, p.CreatedAt, p.UpdatedAt);

    public static SettingDto ToDto(this Setting s) =>
        new(s.Id.ToString(), s.CompanyName, s.Email, s.Phone, s.Address, s.WorkingHours, s.Logo,
            s.Favicon, s.Facebook, s.Linkedin, s.Instagram, s.Youtube, s.Whatsapp, s.Copyright,
            s.GoogleMap, s.Analytics, s.CreatedAt, s.UpdatedAt);
}
