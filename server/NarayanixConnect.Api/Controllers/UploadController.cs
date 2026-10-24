using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NarayanixConnect.Api.Options;
using NarayanixConnect.Api.Security;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Admin only: upload the site logo / favicon.</summary>
[ApiController]
[Route("api/upload")]
[Authorize]
[RequirePermission(PermissionCatalog.SettingsEdit)]
public class UploadController : ControllerBase
{
    private const long MaxFileBytes = 5 * 1024 * 1024;

    private readonly UploadSettings _uploads;
    private readonly ILogger<UploadController> _logger;

    public UploadController(UploadSettings uploads, ILogger<UploadController> logger)
    {
        _uploads = uploads;
        _logger = logger;
    }

    [HttpPost("{type}")]
    [RequestSizeLimit(MaxFileBytes + 1024 * 1024)]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxFileBytes + 1024 * 1024)]
    public async Task<IActionResult> Upload(string type, IFormFile? image)
    {
        if (type != "logo" && type != "favicon")
        {
            return BadRequest(new { success = false, message = "Invalid upload type" });
        }

        if (image is null || image.Length == 0)
        {
            return BadRequest(new { success = false, message = "No file uploaded" });
        }

        if (image.Length > MaxFileBytes)
        {
            return BadRequest(new { success = false, message = "File is too large (maximum 5 MB)." });
        }

        // SVG is intentionally not allowed: it can carry scripts.
        var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
        if (extension is not (".png" or ".jpg" or ".jpeg" or ".gif" or ".webp" or ".ico"))
        {
            return BadRequest(new { success = false, message = "Only PNG, JPG, GIF, WEBP or ICO images are allowed." });
        }

        try
        {
            // Check the real file signature, not just the extension.
            var header = new byte[12];
            int read;
            await using (var stream = image.OpenReadStream())
            {
                read = await stream.ReadAsync(header.AsMemory(0, header.Length));
            }

            if (!HasValidSignature(extension, header, read))
            {
                return BadRequest(new { success = false, message = "The file is not a valid image." });
            }

            // Timestamp in the name busts any cached copy of the previous logo/favicon.
            var fileName = $"{type}-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}{extension}";
            var fullPath = Path.Combine(_uploads.PhysicalPath, fileName);

            await using (var target = new FileStream(fullPath, FileMode.CreateNew))
            {
                await image.CopyToAsync(target);
            }

            var imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
            return Ok(new { success = true, image = imageUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Upload failed");
            return StatusCode(500, new { success = false, message = "Unable to upload the image." });
        }
    }

    private static bool HasValidSignature(string extension, byte[] h, int length) => extension switch
    {
        ".png" => length >= 8 && h[0] == 0x89 && h[1] == 0x50 && h[2] == 0x4E && h[3] == 0x47,
        ".jpg" or ".jpeg" => length >= 3 && h[0] == 0xFF && h[1] == 0xD8 && h[2] == 0xFF,
        ".gif" => length >= 4 && h[0] == 0x47 && h[1] == 0x49 && h[2] == 0x46 && h[3] == 0x38,
        ".webp" => length >= 12 && h[0] == 0x52 && h[1] == 0x49 && h[2] == 0x46 && h[3] == 0x46
                   && h[8] == 0x57 && h[9] == 0x45 && h[10] == 0x42 && h[11] == 0x50,
        ".ico" => length >= 4 && h[0] == 0x00 && h[1] == 0x00 && h[2] == 0x01 && h[3] == 0x00,
        _ => false
    };
}
