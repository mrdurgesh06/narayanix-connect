using System.Text.Json;
using System.Text.RegularExpressions;

namespace NarayanixConnect.Api.Dtos;

public record WebsiteContentDto(string SectionKey, JsonElement Content, DateTime UpdatedAt);

public static class WebsiteContentRules
{
    public const int MaxContentChars = 64 * 1024;

    // Dotted camelCase path with 2-4 parts, e.g. "home.hero", "home.techPlatform", "seo.home".
    private static readonly Regex KeyPattern = new(
        @"^[a-z][A-Za-z0-9]{0,39}(\.[a-z][A-Za-z0-9]{0,39}){1,3}$",
        RegexOptions.Compiled | RegexOptions.CultureInvariant);

    public static bool IsValidKey(string? key) =>
        !string.IsNullOrEmpty(key) && key.Length <= 100 && KeyPattern.IsMatch(key);
}
