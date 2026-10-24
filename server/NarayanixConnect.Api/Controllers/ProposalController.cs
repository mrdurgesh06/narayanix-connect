using Microsoft.AspNetCore.Mvc;
using NarayanixConnect.Api.Data;
using NarayanixConnect.Api.Dtos;
using NarayanixConnect.Api.Entities;
using NarayanixConnect.Api.Services;

namespace NarayanixConnect.Api.Controllers;

/// <summary>Public: "Get Proposal" page form submissions.</summary>
[ApiController]
[Route("api/proposal")]
public class ProposalController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmailService _email;
    private readonly ILogger<ProposalController> _logger;

    public ProposalController(AppDbContext db, IEmailService email, ILogger<ProposalController> logger)
    {
        _db = db;
        _email = email;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProposalRequest? request)
    {
        var company = InputValidator.Clean(request?.Company);
        var name = InputValidator.Clean(request?.Name);
        var email = InputValidator.Clean(request?.Email);
        var phone = InputValidator.Clean(request?.Phone);
        var website = InputValidator.Clean(request?.Website);
        var service = InputValidator.Clean(request?.Service);
        var budget = InputValidator.Clean(request?.Budget);
        var message = InputValidator.Clean(request?.Message);

        // Required: company, name, email, phone, service, message (website, budget optional).
        if (company.Length == 0 || name.Length == 0 || email.Length == 0 ||
            phone.Length == 0 || service.Length == 0 || message.Length == 0)
        {
            return BadRequest(new { success = false, message = "Please fill all required fields." });
        }

        var tooLong = InputValidator.FirstTooLong(
            ("Company", company, 200), ("Name", name, 150), ("Phone", phone, 30),
            ("Website", website, 500), ("Service", service, 150), ("Budget", budget, 100),
            ("Message", message, 4000));
        if (tooLong is not null)
        {
            return BadRequest(new { success = false, message = tooLong });
        }

        if (!InputValidator.IsValidEmail(email))
        {
            return BadRequest(new { success = false, message = "Please enter a valid email address." });
        }

        var proposal = new Proposal
        {
            Company = company,
            Name = name,
            Email = email.ToLowerInvariant(),
            Phone = phone,
            Website = website,
            Service = service,
            Budget = budget,
            Message = message
        };

        try
        {
            _db.Proposals.Add(proposal);
            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Create proposal failed");
            return StatusCode(500, new { success = false, message = "Unable to submit your proposal." });
        }

        if (_email.IsConfigured)
        {
            var (subject, html) = EmailTemplates.ForProposal(proposal);
            _ = _email.SendAsync(subject, html);
        }

        return StatusCode(StatusCodes.Status201Created, new
        {
            success = true,
            message = "Proposal submitted successfully.",
            data = proposal.ToDto()
        });
    }
}
