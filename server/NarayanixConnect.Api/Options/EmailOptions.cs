namespace NarayanixConnect.Api.Options;

public class EmailOptions
{
    public string Host { get; set; } = "smtp.gmail.com";
    public int Port { get; set; } = 587;
    public string User { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string NotifyTo { get; set; } = string.Empty;
}
