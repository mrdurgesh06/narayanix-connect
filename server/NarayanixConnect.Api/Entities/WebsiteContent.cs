namespace NarayanixConnect.Api.Entities;

/// <summary>
/// Table: nrx_con_website_content — one row per website section (e.g. "home.hero").
/// ContentJson is the editable text/icon data of that section as a JSON object.
/// </summary>
public class WebsiteContent : BaseEntity
{
    public string SectionKey { get; set; } = string.Empty;
    public string ContentJson { get; set; } = "{}";
}
