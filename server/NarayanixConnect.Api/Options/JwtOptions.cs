namespace NarayanixConnect.Api.Options;

public class JwtOptions
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "narayanix-connect";
    public string Audience { get; set; } = "narayanix-connect-admin";
    public int ExpiresInDays { get; set; } = 7;
}
