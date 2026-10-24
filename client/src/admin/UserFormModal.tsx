import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, RefreshCw, ShieldCheck, X } from "lucide-react";

import api from "../api/api";
import { PASSWORD_RULE, apiError, generatePassword, validatePassword } from "./auth";
import type { AdminRole, AdminUser, IssuedCredentials, PermissionInfo } from "./auth";

type Props = {
  /** null = create a new user, otherwise edit this user. */
  user: AdminUser | null;
  /** Editing your own account: role and active status are locked (the server enforces it too). */
  isSelf: boolean;
  catalog: PermissionInfo[];
  onClose: () => void;
  /** `credentials` is set only after creating a user (to show the new login ID + password). */
  onSaved: (credentials?: IssuedCredentials) => void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-navy-950 transition focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/15 disabled:bg-slate-50 disabled:text-slate-400";

function UserFormModal({ user, isSelf, catalog, onClose, onSaved }: Props) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<AdminRole>(user?.role ?? "Staff");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  // A Super Admin has every permission implicitly, so nothing is ticked for them.
  const [permissions, setPermissions] = useState<string[]>(
    user && user.role === "Staff" ? [...user.permissions] : []
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const isSuper = role === "SuperAdmin";

  const groups = useMemo(() => {
    const map = new Map<string, PermissionInfo[]>();

    for (const permission of catalog) {
      const list = map.get(permission.group) ?? [];
      list.push(permission);
      map.set(permission.group, list);
    }

    return Array.from(map.entries());
  }, [catalog]);

  // "Delete" needs "View": ticking delete ticks view, unticking view unticks delete.
  const togglePermission = (key: string) => {
    setPermissions((current) => {
      if (current.includes(key)) {
        const removed = current.filter((k) => k !== key);
        return key.endsWith(".view")
          ? removed.filter((k) => k !== key.replace(".view", ".delete"))
          : removed;
      }

      const added = [...current, key];
      if (key.endsWith(".delete")) {
        const viewKey = key.replace(".delete", ".view");
        if (!added.includes(viewKey)) added.push(viewKey);
      }

      return added;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Name is required.");
      return;
    }

    if (!user) {
      const problem = validatePassword(password);
      if (problem) {
        toast.error(problem);
        return;
      }
    }

    setSaving(true);

    try {
      if (user) {
        const body: Record<string, unknown> = {
          name: trimmedName,
          email: email.trim(),
          permissions: isSuper ? [] : permissions,
        };

        if (!isSelf) {
          body.role = role;
          body.isActive = isActive;
        }

        await api.put(`/admin/users/${user.id}`, body);
        toast.success("User updated successfully.");
        onSaved();
      } else {
        const res = await api.post("/admin/users", {
          name: trimmedName,
          email: email.trim(),
          password,
          role,
          permissions: isSuper ? [] : permissions,
        });

        toast.success(res.data.message);
        onSaved({
          userCode: res.data.data.userCode,
          name: trimmedName,
          password,
          reason: "created",
        });
      }
    } catch (error) {
      toast.error(apiError(error, "Unable to save the user."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-navy-950">
              {user ? `Edit ${user.userCode}` : "Add new user"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {user
                ? "Change details and what this user is allowed to do."
                : "A login ID (like NRXCON0002) is generated automatically when you save."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-950">Full name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="e.g. Ravi Kumar"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-950">
                Email <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={256}
                placeholder="name@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-950">Role</label>
              <select
                value={role}
                disabled={isSelf}
                onChange={(e) => setRole(e.target.value as AdminRole)}
                className={inputClass}
              >
                <option value="Staff">Staff (only the permissions ticked below)</option>
                <option value="SuperAdmin">Super Admin (everything + manage users)</option>
              </select>
            </div>

            {user && (
              <div className="flex items-end">
                <label
                  className={`flex h-11 items-center gap-2.5 text-sm font-semibold text-navy-950 ${
                    isSelf ? "opacity-50" : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    disabled={isSelf}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 accent-navy-700"
                  />
                  Account is active
                </label>
              </div>
            )}
          </div>

          {!user && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-950">Temporary password *</label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-11 font-mono`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-navy-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPassword(generatePassword());
                    setShowPassword(true);
                  }}
                  className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RefreshCw size={14} />
                  Generate
                </button>
              </div>

              <p className="mt-1.5 text-xs text-slate-500">
                {PASSWORD_RULE} The user must change it at their first login.
              </p>
            </div>
          )}

          {/* Permissions */}
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold-600" />
              <h3 className="text-sm font-extrabold text-navy-950">What can this user do?</h3>
            </div>

            {isSuper ? (
              <div className="rounded-xl border border-gold-500/30 bg-gold-500/[0.07] px-4 py-3 text-sm text-slate-700">
                A <strong>Super Admin</strong> can do everything, including adding and managing other users.
                No checkboxes are needed.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {groups.map(([group, items]) => (
                  <div key={group} className="rounded-xl border border-slate-200 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{group}</h4>

                    <div className="mt-2.5 space-y-2.5">
                      {items.map((permission) => (
                        <label
                          key={permission.key}
                          className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={permissions.includes(permission.key)}
                            onChange={() => togglePermission(permission.key)}
                            className="mt-0.5 h-4 w-4 flex-none accent-navy-700"
                          />
                          <span>{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isSuper && (
              <p className="mt-2 text-xs text-slate-500">
                Every user can sign in, see the dashboard and change their own password. Deleting something
                always requires being allowed to view it.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : user ? "Save changes" : "Create user"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserFormModal;
