namespace NarayanixConnect.Api.Security;

public record PermissionInfo(string Key, string Label, string Group);

/// <summary>Roles stored in nrx_con_admin.Role.</summary>
public static class AdminRoles
{
    public const string SuperAdmin = "SuperAdmin";
    public const string Staff = "Staff";

    public static bool IsValid(string? role) => role == SuperAdmin || role == Staff;
}

/// <summary>
/// The permissions a Super Admin can tick for a Staff user. A Super Admin implicitly has all of
/// them (and is the only role that can manage users — that is NOT a checkbox on purpose, so a
/// staff member can never grant themselves more power).
/// </summary>
public static class PermissionCatalog
{
    public const string ContactsView = "contacts.view";
    public const string ContactsDelete = "contacts.delete";
    public const string ProposalsView = "proposals.view";
    public const string ProposalsDelete = "proposals.delete";
    public const string ContentEdit = "content.edit";
    public const string SettingsEdit = "settings.edit";

    public static readonly IReadOnlyList<PermissionInfo> Catalog = new List<PermissionInfo>
    {
        new(ContactsView, "View contacts", "Contacts"),
        new(ContactsDelete, "Delete contacts", "Contacts"),
        new(ProposalsView, "View proposals", "Proposals"),
        new(ProposalsDelete, "Delete proposals", "Proposals"),
        new(ContentEdit, "Edit website content", "Website content"),
        new(SettingsEdit, "Edit site settings (company info, logo, analytics)", "Settings"),
    };

    public static readonly IReadOnlyList<string> AllKeys = Catalog.Select(p => p.Key).ToList();

    public static bool IsValid(string? key) => key is not null && AllKeys.Contains(key);

    /// <summary>
    /// Validates and normalises a submitted permission list: trims, removes duplicates and applies
    /// "delete implies view". If a key is unknown, <paramref name="unknown"/> is set and an empty list returned.
    /// </summary>
    public static List<string> Normalize(IEnumerable<string>? keys, out string? unknown)
    {
        unknown = null;
        var set = new HashSet<string>(StringComparer.Ordinal);

        foreach (var raw in keys ?? Array.Empty<string>())
        {
            var key = (raw ?? string.Empty).Trim();
            if (!IsValid(key))
            {
                unknown = key;
                return new List<string>();
            }

            set.Add(key);
        }

        if (set.Contains(ContactsDelete)) set.Add(ContactsView);
        if (set.Contains(ProposalsDelete)) set.Add(ProposalsView);

        return set.OrderBy(k => k, StringComparer.Ordinal).ToList();
    }
}
