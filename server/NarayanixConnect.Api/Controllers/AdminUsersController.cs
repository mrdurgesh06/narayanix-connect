using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Super Admin only: create and manage staff accounts (login ID, password, permissions).</summary>
[ApiController]
[Route("api/admin/users")]
[Authorize]
[RequireSuperAdmin]
public class AdminUsersController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<AdminUsersController> _logger;

    public AdminUsersController(AppDbContext db, ILogger<AdminUsersController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>The checkbox list for the "add / edit user" form.</summary>
    [HttpGet("permissions")]
    public IActionResult GetPermissionCatalog() => Ok(PermissionCatalog.Catalog);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var admins = await _db.Admins.AsNoTracking().Include(a => a.Permissions).OrderBy(a => a.Id).ToListAsync();
            return Ok(admins.Select(a => a.ToDto()));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "List users failed");
            return StatusCode(500, new { success = false, message = "Unable to load users." });
        }
    }

    /* ===================================
       Create
    =================================== */

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest? request)
    {
        if (request is null)
        {
            return BadRequest(new { success = false, message = "Invalid request." });
        }

        var name = InputValidator.Clean(request.Name);
        var email = InputValidator.Clean(request.Email);
        var role = string.IsNullOrWhiteSpace(request.Role) ? AdminRoles.Staff : request.Role.Trim();

        if (name.Length == 0)
        {
            return BadRequest(new { success = false, message = "Name is required." });
        }

        if (name.Length > 100)
        {
            return BadRequest(new { success = false, message = "Name is too long (maximum 100 characters)." });
        }

        if (email.Length > 0 && !InputValidator.IsValidEmail(email))
        {
            return BadRequest(new { success = false, message = "Please enter a valid email address or leave it empty." });
        }

        if (!AdminRoles.IsValid(role))
        {
            return BadRequest(new { success = false, message = "Role must be SuperAdmin or Staff." });
        }

        var passwordError = PasswordRules.Validate(request.Password);
        if (passwordError is not null)
        {
            return BadRequest(new { success = false, message = passwordError });
        }

        var permissions = PermissionCatalog.Normalize(request.Permissions, out var unknown);
        if (unknown is not null)
        {
            return BadRequest(new { success = false, message = $"Unknown permission: {unknown}" });
        }

        try
        {
            var normalizedEmail = email.Length == 0 ? null : email.ToLowerInvariant();

            if (normalizedEmail is not null && await _db.Admins.AnyAsync(a => a.Email == normalizedEmail))
            {
                return Conflict(new { success = false, message = "Another user already uses this email." });
            }

            var admin = new Admin
            {
                Name = name,
                Email = normalizedEmail,
                Role = role,
                IsActive = true,
                // The Super Admin chooses the first password; the user must replace it at first login.
                MustChangePassword = true,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password!)
            };

            // A Super Admin has every permission implicitly, so nothing is stored for them.
            if (role == AdminRoles.Staff)
            {
                foreach (var key in permissions)
                {
                    admin.Permissions.Add(new AdminPermission { PermissionKey = key });
                }
            }

            _db.Admins.Add(admin);
            await _db.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, new
            {
                success = true,
                message = $"User {admin.UserCode} created successfully.",
                data = admin.ToDto()
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Create user failed");
            return StatusCode(500, new { success = false, message = "Unable to create the user." });
        }
    }

    /* ===================================
       Update (name, email, role, active, permissions)
    =================================== */

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateUserRequest? request)
    {
        if (!int.TryParse(id, out var userId))
        {
            return NotFound(new { success = false, message = "User not found." });
        }

        if (request is null)
        {
            return BadRequest(new { success = false, message = "Invalid request." });
        }

        try
        {
            var admin = await _db.Admins.Include(a => a.Permissions).FirstOrDefaultAsync(a => a.Id == userId);
            if (admin is null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            var myId = User.AdminId();

            // ----- validate everything first, change nothing until it all passes -----
            string? newName = null;
            if (request.Name is not null)
            {
                newName = InputValidator.Clean(request.Name);
                if (newName.Length == 0 || newName.Length > 100)
                {
                    return BadRequest(new { success = false, message = "Name is required (maximum 100 characters)." });
                }
            }

            var emailProvided = request.Email is not null;
            string? newEmail = null;
            if (emailProvided)
            {
                var email = InputValidator.Clean(request.Email);
                if (email.Length > 0)
                {
                    if (!InputValidator.IsValidEmail(email))
                    {
                        return BadRequest(new { success = false, message = "Please enter a valid email address or leave it empty." });
                    }

                    newEmail = email.ToLowerInvariant();

                    if (await _db.Admins.AnyAsync(a => a.Id != userId && a.Email == newEmail))
                    {
                        return Conflict(new { success = false, message = "Another user already uses this email." });
                    }
                }
            }

            var newRole = admin.Role;
            if (request.Role is not null)
            {
                newRole = request.Role.Trim();
                if (!AdminRoles.IsValid(newRole))
                {
                    return BadRequest(new { success = false, message = "Role must be SuperAdmin or Staff." });
                }
            }

            var newActive = request.IsActive ?? admin.IsActive;

            List<string>? newPermissions = null;
            if (request.Permissions is not null)
            {
                newPermissions = PermissionCatalog.Normalize(request.Permissions, out var unknown);
                if (unknown is not null)
                {
                    return BadRequest(new { success = false, message = $"Unknown permission: {unknown}" });
                }
            }

            // Nobody can lock themselves out.
            if (userId == myId && (newRole != admin.Role || !newActive))
            {
                return BadRequest(new { success = false, message = "You cannot change your own role or deactivate your own account." });
            }

            // There must always be at least one active Super Admin.
            if (admin.Role == AdminRoles.SuperAdmin && admin.IsActive && (newRole != AdminRoles.SuperAdmin || !newActive))
            {
                var otherActiveSuperAdmins = await _db.Admins
                    .CountAsync(a => a.Id != userId && a.Role == AdminRoles.SuperAdmin && a.IsActive);

                if (otherActiveSuperAdmins == 0)
                {
                    return BadRequest(new { success = false, message = "At least one active Super Admin is required." });
                }
            }

            // ----- apply -----
            if (newName is not null) admin.Name = newName;
            if (emailProvided) admin.Email = newEmail;
            admin.Role = newRole;
            admin.IsActive = newActive;

            if (newRole == AdminRoles.SuperAdmin)
            {
                SyncPermissions(admin, new List<string>());
            }
            else if (newPermissions is not null)
            {
                SyncPermissions(admin, newPermissions);
            }

            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "User updated successfully.", data = admin.ToDto() });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Update user failed");
            return StatusCode(500, new { success = false, message = "Unable to update the user." });
        }
    }

    /* ===================================
       Reset password (user must change it at next login)
    =================================== */

    [HttpPost("{id}/reset-password")]
    public async Task<IActionResult> ResetPassword(string id, [FromBody] ResetPasswordRequest? request)
    {
        if (!int.TryParse(id, out var userId))
        {
            return NotFound(new { success = false, message = "User not found." });
        }

        if (userId == User.AdminId())
        {
            return BadRequest(new { success = false, message = "Use \"Change Password\" for your own account." });
        }

        var passwordError = PasswordRules.Validate(request?.NewPassword);
        if (passwordError is not null)
        {
            return BadRequest(new { success = false, message = passwordError });
        }

        try
        {
            var admin = await _db.Admins.FirstOrDefaultAsync(a => a.Id == userId);
            if (admin is null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request!.NewPassword!);
            admin.MustChangePassword = true;
            await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = $"Password reset for {admin.UserCode}. The user must change it at the next login."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Reset password failed");
            return StatusCode(500, new { success = false, message = "Unable to reset the password." });
        }
    }

    /* ===================================
       Delete
    =================================== */

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        if (!int.TryParse(id, out var userId))
        {
            return NotFound(new { success = false, message = "User not found." });
        }

        if (userId == User.AdminId())
        {
            return BadRequest(new { success = false, message = "You cannot delete your own account." });
        }

        try
        {
            var admin = await _db.Admins.AsNoTracking().FirstOrDefaultAsync(a => a.Id == userId);
            if (admin is null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            if (admin.Role == AdminRoles.SuperAdmin && admin.IsActive)
            {
                var otherActiveSuperAdmins = await _db.Admins
                    .CountAsync(a => a.Id != userId && a.Role == AdminRoles.SuperAdmin && a.IsActive);

                if (otherActiveSuperAdmins == 0)
                {
                    return BadRequest(new { success = false, message = "At least one active Super Admin is required." });
                }
            }

            // The user's permission rows are removed by the database (ON DELETE CASCADE).
            await _db.Admins.Where(a => a.Id == userId).ExecuteDeleteAsync();

            return Ok(new { success = true, message = $"User {admin.UserCode} deleted." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Delete user failed");
            return StatusCode(500, new { success = false, message = "Unable to delete the user." });
        }
    }

    /// <summary>Makes the stored permission rows match <paramref name="wanted"/> exactly.</summary>
    private void SyncPermissions(Admin admin, List<string> wanted)
    {
        var toRemove = admin.Permissions.Where(p => !wanted.Contains(p.PermissionKey)).ToList();
        foreach (var permission in toRemove)
        {
            admin.Permissions.Remove(permission);
            _db.AdminPermissions.Remove(permission);
        }

        foreach (var key in wanted)
        {
            if (!admin.Permissions.Any(p => p.PermissionKey == key))
            {
                admin.Permissions.Add(new AdminPermission { PermissionKey = key });
            }
        }
    }
}
