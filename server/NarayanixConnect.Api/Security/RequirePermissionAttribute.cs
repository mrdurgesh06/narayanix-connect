using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace NarayanixConnect.Api.Security;

/// <summary>
/// Use together with [Authorize]: allows the call only if the signed-in admin is a Super Admin
/// or has the given permission ticked. Permissions are read from the database on every request
/// (see Program.cs, OnTokenValidated), so changes take effect immediately.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public sealed class RequirePermissionAttribute : Attribute, IAuthorizationFilter
{
    public string Permission { get; }

    public RequirePermissionAttribute(string permission)
    {
        Permission = permission;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        // Not signed in: the [Authorize] / JWT challenge produces the 401, not this filter.
        if (user.Identity?.IsAuthenticated != true)
        {
            return;
        }

        if (!user.HasPermission(Permission))
        {
            context.Result = new ObjectResult(new
            {
                success = false,
                message = "You do not have permission to do this."
            })
            { StatusCode = StatusCodes.Status403Forbidden };
        }
    }
}

/// <summary>Allows only Super Admins (user management is never a delegable permission).</summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class RequireSuperAdminAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        if (user.Identity?.IsAuthenticated != true)
        {
            return;
        }

        if (!user.IsSuperAdmin())
        {
            context.Result = new ObjectResult(new
            {
                success = false,
                message = "Only a Super Admin can do this."
            })
            { StatusCode = StatusCodes.Status403Forbidden };
        }
    }
}
