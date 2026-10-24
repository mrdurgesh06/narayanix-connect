namespace NarayanixConnect.Api.Dtos;

// All properties are nullable on purpose: missing JSON fields must produce our own
// {"success": false, "message": ...} validation response, not a framework error.

public class LoginRequest
{
    /// <summary>Login ID (NRXCON0001). The old "email" field is still accepted.</summary>
    public string? LoginId { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class CreateUserRequest
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; }
    public List<string>? Permissions { get; set; }
}

public class UpdateUserRequest
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Role { get; set; }
    public bool? IsActive { get; set; }
    public List<string>? Permissions { get; set; }
}

public class ResetPasswordRequest
{
    public string? NewPassword { get; set; }
}

public class ChangePasswordRequest
{
    public string? CurrentPassword { get; set; }
    public string? NewPassword { get; set; }
}

public class ContactRequest
{
    public string? Name { get; set; }
    public string? Company { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Message { get; set; }
}

public class ProposalRequest
{
    public string? Company { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Website { get; set; }
    public string? Service { get; set; }
    public string? Budget { get; set; }
    public string? Message { get; set; }
}

/// <summary>
/// The only fields the Settings page may change. Id / CreatedAt / UpdatedAt sent by the
/// client are ignored (the old Node code copied the whole request body onto the document).
/// </summary>
public class SettingUpdateRequest
{
    public string? CompanyName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? WorkingHours { get; set; }
    public string? Logo { get; set; }
    public string? Favicon { get; set; }
    public string? Facebook { get; set; }
    public string? Linkedin { get; set; }
    public string? Instagram { get; set; }
    public string? Youtube { get; set; }
    public string? Whatsapp { get; set; }
    public string? Copyright { get; set; }
    public string? GoogleMap { get; set; }
    public string? Analytics { get; set; }
}
