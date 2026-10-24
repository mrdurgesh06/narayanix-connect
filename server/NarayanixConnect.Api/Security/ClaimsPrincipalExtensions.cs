using System.Security.Claims;

namespace NarayanixConnect.Api.Security;

public static class ClaimsPrincipalExtensions
{
    /// <summary>Id of the signed-in admin (claim "id" of our JWT).</summary>
    public static int AdminId(this ClaimsPrincipal user) => int.Parse(user.FindFirst("id")!.Value);

    public static bool IsSuperAdmin(this ClaimsPrincipal user) =>
        user.HasClaim(ClaimTypes.Role, AdminRoles.SuperAdmin);

    /// <summary>Super Admin has every permission; Staff only the ones ticked for them.</summary>
    public static bool HasPermission(this ClaimsPrincipal user, string permission) =>
        user.IsSuperAdmin() || user.HasClaim("perm", permission);
}
