using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Admin only: list, save and reset website sections.</summary>
[ApiController]
[Route("api/admin/website-content")]
[Authorize]
[RequirePermission(PermissionCatalog.ContentEdit)]
public class AdminWebsiteContentController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<AdminWebsiteContentController> _logger;

    public AdminWebsiteContentController(AppDbContext db, ILogger<AdminWebsiteContentController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>All saved sections with their last-updated time.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var rows = await _db.WebsiteContents.AsNoTracking().OrderBy(x => x.SectionKey).ToListAsync();
            var result = new List<WebsiteContentDto>();

            foreach (var row in rows)
            {
                try
                {
                    result.Add(ToDto(row));
                }
                catch (JsonException ex)
                {
                    _logger.LogWarning(ex, "Invalid JSON in website content section {SectionKey}", row.SectionKey);
                }
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "List website content failed");
            return StatusCode(500, new { success = false, message = "Unable to load website content." });
        }
    }

    /// <summary>Create or replace one section. Body = the section's JSON object.</summary>
    [HttpPut("{sectionKey}")]
    public async Task<IActionResult> Save(string sectionKey, [FromBody] JsonElement? content)
    {
        if (!WebsiteContentRules.IsValidKey(sectionKey))
        {
            return BadRequest(new { success = false, message = "Invalid section key." });
        }

        if (content is null || content.Value.ValueKind != JsonValueKind.Object)
        {
            return BadRequest(new { success = false, message = "Content must be a JSON object." });
        }

        var json = content.Value.GetRawText();
        if (json.Length > WebsiteContentRules.MaxContentChars)
        {
            return BadRequest(new { success = false, message = "Content is too large (maximum 64 KB)." });
        }

        try
        {
            var row = await UpsertAsync(sectionKey, json);

            return Ok(new
            {
                success = true,
                message = "Content saved successfully.",
                data = ToDto(row)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Save website content {SectionKey} failed", sectionKey);
            return StatusCode(500, new { success = false, message = "Unable to save content." });
        }
    }

    /// <summary>Delete the saved row so the website falls back to its built-in defaults.</summary>
    [HttpDelete("{sectionKey}")]
    public async Task<IActionResult> Reset(string sectionKey)
    {
        if (!WebsiteContentRules.IsValidKey(sectionKey))
        {
            return BadRequest(new { success = false, message = "Invalid section key." });
        }

        try
        {
            var deleted = await _db.WebsiteContents.Where(x => x.SectionKey == sectionKey).ExecuteDeleteAsync();

            return Ok(new
            {
                success = true,
                message = deleted > 0 ? "Content reset to default." : "Already using default content."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Reset website content {SectionKey} failed", sectionKey);
            return StatusCode(500, new { success = false, message = "Unable to reset content." });
        }
    }

    private async Task<WebsiteContent> UpsertAsync(string sectionKey, string json)
    {
        var row = await _db.WebsiteContents.FirstOrDefaultAsync(x => x.SectionKey == sectionKey);

        if (row is null)
        {
            row = new WebsiteContent { SectionKey = sectionKey, ContentJson = json };
            _db.WebsiteContents.Add(row);
        }
        else
        {
            row.ContentJson = json;
        }

        try
        {
            await _db.SaveChangesAsync();
            return row;
        }
        catch (DbUpdateException)
        {
            // Another request inserted the same key at the same moment: update that row instead.
            _db.ChangeTracker.Clear();
            var existing = await _db.WebsiteContents.FirstAsync(x => x.SectionKey == sectionKey);
            existing.ContentJson = json;
            await _db.SaveChangesAsync();
            return existing;
        }
    }

    private static WebsiteContentDto ToDto(WebsiteContent row) =>
        new(row.SectionKey, JsonSerializer.Deserialize<JsonElement>(row.ContentJson), row.UpdatedAt);
}
