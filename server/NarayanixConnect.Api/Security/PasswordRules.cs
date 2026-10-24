namespace NarayanixConnect.Api.Security;

public static class PasswordRules
{
    public const string Message = "Password must be 8 to 100 characters and include at least one letter and one number.";

    /// <summary>Returns an error message, or null when the password is acceptable.</summary>
    public static string? Validate(string? password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 8 || password.Length > 100)
        {
            return Message;
        }

        var hasLetter = password.Any(char.IsLetter);
        var hasDigit = password.Any(char.IsDigit);

        return hasLetter && hasDigit ? null : Message;
    }
}
