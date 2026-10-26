using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using NarayanixConnect.Api.Options;

namespace NarayanixConnect.Api.Services;

public interface IEmailService
{
    /// <summary>True when SMTP user, password and the notification address are all configured.</summary>
    bool IsConfigured { get; }

    /// <summary>Best-effort send: never throws; failures are logged.</summary>
    Task SendAsync(string subject, string html);
}

public class EmailService : IEmailService
{
    private readonly EmailOptions _options;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailOptions> options, ILogger<EmailService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(_options.User) &&
        !string.IsNullOrWhiteSpace(_options.Password) &&
        !string.IsNullOrWhiteSpace(_options.NotifyTo);

    public async Task SendAsync(string subject, string html)
    {
        if (!IsConfigured)
        {
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("NarayaniX Connect", _options.User));
            message.To.Add(MailboxAddress.Parse(_options.NotifyTo));
            message.Subject = subject;
            message.Body = new BodyBuilder { HtmlBody = html }.ToMessageBody();

            using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(20));
            using var client = new SmtpClient();

            await client.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.StartTls, timeout.Token);
            // Gmail shows app passwords with spaces; the spaces are not part of the password.
            await client.AuthenticateAsync(_options.User, _options.Password.Replace(" ", string.Empty), timeout.Token);
            await client.SendAsync(message, timeout.Token);
            await client.DisconnectAsync(true, timeout.Token);

            _logger.LogInformation("Notification email sent: {Subject}", subject);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Email send failed: {Subject}", subject);
        }
    }
}
