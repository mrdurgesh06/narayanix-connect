namespace NarayanixConnect.Api.Entities;

/// <summary>Table: nrx_con_proposal</summary>
public class Proposal : BaseEntity
{
    public string Company { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string Service { get; set; } = string.Empty;
    public string Budget { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
