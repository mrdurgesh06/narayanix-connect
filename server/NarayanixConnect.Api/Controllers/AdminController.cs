using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Security;
using NarayanixConnect.Api.Services;

namespace NarayanixConnect.Api.Controllers;

/// <summary>
/// Admin panel API. Login is public; everything else needs a valid token, and the data endpoints
/// additionally need the matching permission (Super Admin has all of them).
/// </summary>
[ApiController]
[Route("api/admin")]
[Authorize]
public class AdminController : ControllerBase
{
    // Verified when the login ID is unknown so response time does not reveal which IDs exist.
    private static readonly string DummyHash = BCrypt.Net.BCrypt.HashPassword("not-a-real-password");

    private static readonly Regex UserCodePattern =
        new(@"^NRXCON\d{4,}$", RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.CultureInvariant);

    private readonly AppDbContext _db;
    private readonly TokenService _tokens;
    private readonly ILogger<AdminController> _logger;

    public AdminController(AppDbContext db, TokenService tokens, ILogger<AdminController> logger)
    {
        _db = db;
        _tokens = tokens;
        _logger = logger;
    }

    /* ===================================
       Login (public, strict rate limit)
       Login ID = NRXCON0001 (the old email login still works)
    =================================== */

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest? request)
    {
        var loginId = InputValidator.Clean(request?.LoginId ?? request?.Email);
        var password = request?.Password ?? string.Empty;

        if (loginId.Length == 0 || password.Length == 0)
        {
            return BadRequest(new { success = false, message = "Login ID and password are required." });
        }

        if (loginId.Length > 256 || password.Length > 200)
        {
            return Unauthorized(new { success = false, message = "Invalid login ID or password." });
        }

        try
        {
            var query = _db.Admins.Include(a => a.Permissions);

            var admin = UserCodePattern.IsMatch(loginId)
                ? await query.FirstOrDefaultAsync(a => a.UserCode == loginId.ToUpperInvariant())
                : await query.FirstOrDefaultAsync(a => a.Email == loginId.ToLowerInvariant());

            var passwordOk = BCrypt.Net.BCrypt.Verify(password, admin?.PasswordHash ?? DummyHash);

            if (admin is null || !passwordOk)
            {
                return Unauthorized(new { success = false, message = "Invalid login ID or password." });
            }

            if (!admin.IsActive)
            {
                // Only shown after the password was correct, so it does not reveal accounts to strangers.
                return StatusCode(StatusCodes.Status403Forbidden, new
                {
                    success = false,
                    message = "This account is disabled. Please contact your Super Admin."
                });
            }

            return Ok(new
            {
                success = true,
                token = _tokens.CreateToken(admin),
                admin = admin.ToDto()
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Admin login failed");
            return StatusCode(500, new { success = false, message = "Unable to log in right now." });
        }
    }

    /* ===================================
       Current user + change own password
    =================================== */

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var id = User.AdminId();
        var admin = await _db.Admins.AsNoTracking().Include(a => a.Permissions).FirstOrDefaultAsync(a => a.Id == id);

        if (admin is null)
        {
            return Unauthorized(new { success = false, message = "Not authorized. Please log in." });
        }

        return Ok(new { success = true, admin = admin.ToDto() });
    }

    [HttpPost("change-password")]
    [EnableRateLimiting("login")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest? request)
    {
        var current = request?.CurrentPassword ?? string.Empty;
        var next = request?.NewPassword ?? string.Empty;

        if (current.Length == 0 || next.Length == 0)
        {
            return BadRequest(new { success = false, message = "Current password and new password are required." });
        }

        var passwordError = PasswordRules.Validate(next);
        if (passwordError is not null)
        {
            return BadRequest(new { success = false, message = passwordError });
        }

        if (next == current)
        {
            return BadRequest(new { success = false, message = "The new password must be different from the current password." });
        }

        try
        {
            var id = User.AdminId();
            var admin = await _db.Admins.FirstOrDefaultAsync(a => a.Id == id);

            if (admin is null)
            {
                return Unauthorized(new { success = false, message = "Not authorized. Please log in." });
            }

            // 400 (not 401) so the client does not treat a typo as an expired session.
            if (!BCrypt.Net.BCrypt.Verify(current, admin.PasswordHash))
            {
                return BadRequest(new { success = false, message = "Current password is incorrect." });
            }

            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(next);
            admin.MustChangePassword = false;
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Password changed successfully." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Change password failed");
            return StatusCode(500, new { success = false, message = "Unable to change the password." });
        }
    }

    /* ===================================
       Dashboard (everyone; lists only include what the user may see)
    =================================== */

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        try
        {
            var canContacts = User.HasPermission(PermissionCatalog.ContactsView);
            var canProposals = User.HasPermission(PermissionCatalog.ProposalsView);

            // Sequential on purpose: a DbContext instance must not run queries in parallel.
            var totalContacts = canContacts ? await _db.Contacts.CountAsync() : 0;
            var totalProposals = canProposals ? await _db.Proposals.CountAsync() : 0;

            var latestContacts = canContacts
                ? await _db.Contacts.AsNoTracking()
                    .OrderByDescending(c => c.CreatedAt).ThenByDescending(c => c.Id)
                    .Take(5).ToListAsync()
                : new List<Contact>();

            var latestProposals = canProposals
                ? await _db.Proposals.AsNoTracking()
                    .OrderByDescending(p => p.CreatedAt).ThenByDescending(p => p.Id)
                    .Take(5).ToListAsync()
                : new List<Proposal>();

            return Ok(new
            {
                success = true,
                totalContacts,
                totalProposals,
                latestContacts = latestContacts.Select(c => c.ToDto()),
                latestProposals = latestProposals.Select(p => p.ToDto())
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Dashboard failed");
            return StatusCode(500, new { success = false, message = "Unable to load dashboard data." });
        }
    }

    /* ===================================
       Contacts
    =================================== */

    [HttpGet("contacts")]
    [RequirePermission(PermissionCatalog.ContactsView)]
    public async Task<IActionResult> GetContacts()
    {
        try
        {
            var contacts = await _db.Contacts.AsNoTracking()
                .OrderByDescending(c => c.CreatedAt).ThenByDescending(c => c.Id)
                .ToListAsync();

            return Ok(contacts.Select(c => c.ToDto()));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Get contacts failed");
            return StatusCode(500, new { success = false, message = "Unable to fetch contacts." });
        }
    }

    [HttpDelete("contacts/{id}")]
    [RequirePermission(PermissionCatalog.ContactsDelete)]
    public async Task<IActionResult> DeleteContact(string id)
    {
        if (!int.TryParse(id, out var contactId))
        {
            return NotFound(new { success = false, message = "Contact not found" });
        }

        try
        {
            var deleted = await _db.Contacts.Where(c => c.Id == contactId).ExecuteDeleteAsync();

            if (deleted == 0)
            {
                return NotFound(new { success = false, message = "Contact not found" });
            }

            return Ok(new { success = true, message = "Contact deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Delete contact failed");
            return StatusCode(500, new { success = false, message = "Unable to delete contact." });
        }
    }

    /* ===================================
       Proposals
    =================================== */

    [HttpGet("proposals")]
    [RequirePermission(PermissionCatalog.ProposalsView)]
    public async Task<IActionResult> GetProposals()
    {
        try
        {
            var proposals = await _db.Proposals.AsNoTracking()
                .OrderByDescending(p => p.CreatedAt).ThenByDescending(p => p.Id)
                .ToListAsync();

            return Ok(proposals.Select(p => p.ToDto()));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Get proposals failed");
            return StatusCode(500, new { success = false, message = "Unable to fetch proposals." });
        }
    }

    [HttpDelete("proposals/{id}")]
    [RequirePermission(PermissionCatalog.ProposalsDelete)]
    public async Task<IActionResult> DeleteProposal(string id)
    {
        if (!int.TryParse(id, out var proposalId))
        {
            return NotFound(new { success = false, message = "Proposal not found" });
        }

        try
        {
            var deleted = await _db.Proposals.Where(p => p.Id == proposalId).ExecuteDeleteAsync();

            if (deleted == 0)
            {
                return NotFound(new { success = false, message = "Proposal not found" });
            }

            return Ok(new { success = true, message = "Proposal deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Delete proposal failed");
            return StatusCode(500, new { success = false, message = "Unable to delete proposal." });
        }
    }
}
