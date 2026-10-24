using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarayanixConnect.Api.Data;

namespace NarayanixConnect.Api.Controllers;

/// <summary>
/// Public: returns every saved website section as { "home.hero": {...}, "home.stats": {...} }.
/// Sections that were never saved are simply absent; the website then uses its built-in defaults.
/// </summary>
[ApiController]
[Route("api/website-content")]
public class WebsiteContentController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<WebsiteContentController> _logger;

    public WebsiteContentController(AppDbContext db, ILogger<WebsiteContentController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var rows = await _db.WebsiteContents.AsNoTracking().ToListAsync();
            var sections = new Dictionary<string, JsonElement>();

            foreach (var row in rows)
            {
                try
                {
                    sections[row.SectionKey] = JsonSerializer.Deserialize<JsonElement>(row.ContentJson);
                }
                catch (JsonException ex)
                {
                    // A broken row must not take the whole site down: skip it (defaults are used).
                    _logger.LogWarning(ex, "Invalid JSON in website content section {SectionKey}", row.SectionKey);
                }
            }

            // Short browser cache; admin edits show up within a minute.
            Response.Headers.CacheControl = "public, max-age=60";
            return Ok(sections);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Read website content failed");
            return StatusCode(500, new { success = false, message = "Unable to load website content." });
        }
    }
}
