namespace NarayanixConnect.Api.Entities;

/// <summary>Table: nrx_con_contact</summary>
public class Contact : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
