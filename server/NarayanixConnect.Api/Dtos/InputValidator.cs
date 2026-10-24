using System.Net.Mail;

namespace NarayanixConnect.Api.Dtos;

internal static class InputValidator
{
    /// <summary>Trims; null becomes an empty string.</summary>
    public static string Clean(string? value) => (value ?? string.Empty).Trim();

    public static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email) || email.Length > 256)
        {
            return false;
        }

        try
        {
            // Rejects display-name forms such as "Name <a@b.com>".
            return new MailAddress(email).Address == email;
        }
        catch (FormatException)
        {
            return false;
        }
    }

    /// <summary>Returns an error message for the first value that is too long, otherwise null.</summary>
    public static string? FirstTooLong(params (string Field, string? Value, int Max)[] fields)
    {
        foreach (var (field, value, max) in fields)
        {
            if (value is not null && value.Length > max)
            {
                return $"{field} is too long (maximum {max} characters).";
            }
        }

        return null;
    }
}
