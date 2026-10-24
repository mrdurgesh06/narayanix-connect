using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Site settings: public read (header/footer/contact info), admin-only save.</summary>
[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(AppDbContext db, ILogger<SettingsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var settings = await GetOrCreateAsync();
            return Ok(settings.ToDto());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Read settings failed");
            return StatusCode(500, new { success = false, message = "Unable to load settings." });
        }
    }

    [HttpPost]
    [Authorize]
    [RequirePermission(PermissionCatalog.SettingsEdit)]
    public async Task<IActionResult> Save([FromBody] SettingUpdateRequest? request)
    {
        if (request is null)
        {
            return BadRequest(new { success = false, message = "Invalid request." });
        }

        var tooLong = InputValidator.FirstTooLong(
            ("companyName", request.CompanyName, 200), ("email", request.Email, 256),
            ("phone", request.Phone, 50), ("address", request.Address, 500),
            ("workingHours", request.WorkingHours, 200), ("logo", request.Logo, 500),
            ("favicon", request.Favicon, 500), ("facebook", request.Facebook, 500),
            ("linkedin", request.Linkedin, 500), ("instagram", request.Instagram, 500),
            ("youtube", request.Youtube, 500), ("whatsapp", request.Whatsapp, 200),
            ("copyright", request.Copyright, 200));

        if (tooLong is not null)
        {
            return BadRequest(new { success = false, message = tooLong });
        }

        try
        {
            var settings = await GetOrCreateAsync();
            Apply(settings, request);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Settings saved successfully.",
                data = settings.ToDto()
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Save settings failed");
            return StatusCode(500, new { success = false, message = "Unable to save settings." });
        }
    }

    /// <summary>Only fields that were sent (not null) are changed, like the old Object.assign.</summary>
    private static void Apply(Setting s, SettingUpdateRequest r)
    {
        if (r.CompanyName is not null) s.CompanyName = r.CompanyName.Trim();
        if (r.Email is not null) s.Email = r.Email.Trim();
        if (r.Phone is not null) s.Phone = r.Phone.Trim();
        if (r.Address is not null) s.Address = r.Address.Trim();
        if (r.WorkingHours is not null) s.WorkingHours = r.WorkingHours.Trim();
        if (r.Logo is not null) s.Logo = r.Logo.Trim();
        if (r.Favicon is not null) s.Favicon = r.Favicon.Trim();
        if (r.Facebook is not null) s.Facebook = r.Facebook.Trim();
        if (r.Linkedin is not null) s.Linkedin = r.Linkedin.Trim();
        if (r.Instagram is not null) s.Instagram = r.Instagram.Trim();
        if (r.Youtube is not null) s.Youtube = r.Youtube.Trim();
        if (r.Whatsapp is not null) s.Whatsapp = r.Whatsapp.Trim();
        if (r.Copyright is not null) s.Copyright = r.Copyright.Trim();
        if (r.GoogleMap is not null) s.GoogleMap = r.GoogleMap.Trim();
        if (r.Analytics is not null) s.Analytics = r.Analytics.Trim();
    }

    private async Task<Setting> GetOrCreateAsync()
    {
        var settings = await _db.Settings.FirstOrDefaultAsync();
        if (settings is not null)
        {
            return settings;
        }

        settings = new Setting { Id = Setting.SingletonId };
        _db.Settings.Add(settings);

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            // Another request created the row at the same time: use that one.
            _db.Entry(settings).State = EntityState.Detached;
            settings = await _db.Settings.FirstAsync();
        }

        return settings;
    }
}
