using Microsoft.AspNetCore.Mvc;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Services;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Public: Contact page form submissions.</summary>
[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _email;
    private readonly ILogger<ContactController> _logger;

    public ContactController(AppDbContext db, IEmailService email, ILogger<ContactController> logger)
    {
        _db = db;
        _email = email;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ContactRequest? request)
    {
        var name = InputValidator.Clean(request?.Name);
        var company = InputValidator.Clean(request?.Company);
        var email = InputValidator.Clean(request?.Email);
        var phone = InputValidator.Clean(request?.Phone);
        var message = InputValidator.Clean(request?.Message);

        // Required: name, email, phone, message (company is optional) — same as the Node API.
        if (name.Length == 0 || email.Length == 0 || phone.Length == 0 || message.Length == 0)
        {
            return BadRequest(new { success = false, message = "Please fill all required fields." });
        }

        var tooLong = InputValidator.FirstTooLong(
            ("Name", name, 150), ("Company", company, 200), ("Phone", phone, 30), ("Message", message, 4000));
        if (tooLong is not null)
        {
            return BadRequest(new { success = false, message = tooLong });
        }

        if (!InputValidator.IsValidEmail(email))
        {
            return BadRequest(new { success = false, message = "Please enter a valid email address." });
        }

        var contact = new Contact
        {
            Name = name,
            Company = company,
            Email = email.ToLowerInvariant(),
            Phone = phone,
            Message = message
        };

        try
        {
            _db.Contacts.Add(contact);
            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Create contact failed");
            return StatusCode(500, new { success = false, message = "Unable to submit your message." });
        }

        // Best-effort admin notification — never blocks or fails the response.
        if (_email.IsConfigured)
        {
            var (subject, html) = EmailTemplates.ForContact(contact);
            _ = _email.SendAsync(subject, html);
        }

        return StatusCode(StatusCodes.Status201Created, new
        {
            success = true,
            message = "Message submitted successfully.",
            data = contact.ToDto()
        });
    }
}
