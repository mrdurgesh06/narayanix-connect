namespace NarayanixConnect.Api.Entities;

/// <summary>Table: nrx_con_setting (singleton: exactly one row, Id = 1)</summary>
public class Setting : BaseEntity
{
    public const int SingletonId = 1;

    public string CompanyName { get; set; } = "NarayaniX Connect";
    public string Email { get; set; } = "info@narayanixconnect.com";
    public string Phone { get; set; } = "+91 XXXXX XXXXX";
    public string Address { get; set; } = "India";
    public string WorkingHours { get; set; } = "Monday - Saturday | 9:00 AM - 6:00 PM";
    public string Logo { get; set; } = string.Empty;
    public string Favicon { get; set; } = string.Empty;
    public string Facebook { get; set; } = string.Empty;
    public string Linkedin { get; set; } = string.Empty;
    public string Instagram { get; set; } = string.Empty;
    public string Youtube { get; set; } = string.Empty;
    public string Whatsapp { get; set; } = string.Empty;
    public string Copyright { get; set; } = "© 2026 NarayaniX Connect";
    public string GoogleMap { get; set; } = string.Empty;
    public string Analytics { get; set; } = string.Empty;
}
