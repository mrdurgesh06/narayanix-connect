import axios from "axios";

export type AdminRole = "SuperAdmin" | "Staff";

/** Shape returned by the API for every admin-panel user (login, /admin/me, /admin/users). */
export interface AdminUser {
  id: string;
  userCode: string; // login ID, e.g. NRXCON0001
  name: string;
  email: string | null;
  role: AdminRole;
  isActive: boolean;
  mustChangePassword: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

/** One checkbox of the permission list (GET /admin/users/permissions). */
export interface PermissionInfo {
  key: string;
  label: string;
  group: string;
}

/** Shown once after creating a user or resetting a password, so the Super Admin can hand it over. */
export interface IssuedCredentials {
  userCode: string;
  name: string;
  password: string;
  reason: "created" | "reset";
}

// Keep in sync with server/NarayanixConnect.Api/Security/PermissionCatalog.cs
export const PERMISSIONS = {
  contactsView: "contacts.view",
  contactsDelete: "contacts.delete",
  proposalsView: "proposals.view",
  proposalsDelete: "proposals.delete",
  contentEdit: "content.edit",
  settingsEdit: "settings.edit",
} as const;

/** The server's error message if there is one, otherwise the fallback. */
export function apiError(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (message) return message;
  }

  return fallback;
}

export const PASSWORD_RULE =
  "Password must be 8 to 100 characters and include at least one letter and one number.";

/** Same rule as the server (PasswordRules.cs). Returns an error message or null. */
export function validatePassword(password: string): string | null {
  const ok =
    password.length >= 8 &&
    password.length <= 100 &&
    /\p{L}/u.test(password) &&
    /\d/.test(password);

  return ok ? null : PASSWORD_RULE;
}

/** Random temporary password (no look-alike characters such as 0/O or 1/l). */
export function generatePassword(length = 12): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  const digits = "23456789";
  const all = letters + digits;

  const random = new Uint32Array(length * 2);
  crypto.getRandomValues(random);

  const chars = Array.from({ length }, (_, i) => all[random[i] % all.length]);

  // Guarantee at least one letter and one digit, then shuffle so their positions are not fixed.
  chars[0] = letters[random[length] % letters.length];
  chars[1] = digits[random[length + 1] % digits.length];

  for (let i = chars.length - 1; i > 0; i--) {
    const j = random[(i + length) % random.length] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}
