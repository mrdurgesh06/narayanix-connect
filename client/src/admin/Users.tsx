import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  KeyRound,
  Pencil,
  Power,
  RotateCw,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  UserPlus,
} from "lucide-react";

import api from "../api/api";
import { useAdminAuth } from "./AdminAuthContext";
import { apiError } from "./auth";
import type { AdminUser, IssuedCredentials, PermissionInfo } from "./auth";
import UserFormModal from "./UserFormModal";
import { CredentialsModal, ResetPasswordModal } from "./UserSecretModals";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Users() {
  const { admin: me } = useAdminAuth();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [catalog, setCatalog] = useState<PermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Which dialog is open
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [resetting, setResetting] = useState<AdminUser | null>(null);
  const [credentials, setCredentials] = useState<IssuedCredentials | null>(null);

  const load = useCallback(async () => {
    try {
      const [usersRes, catalogRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/users/permissions"),
      ]);

      setUsers(usersRes.data);
      setCatalog(catalogRes.data);
    } catch (error) {
      toast.error(apiError(error, "Unable to load users."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const permissionLabels = useMemo(
    () => new Map(catalog.map((p) => [p.key, p.label])),
    [catalog]
  );

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter(
      (u) =>
        u.userCode.toLowerCase().includes(keyword) ||
        u.name.toLowerCase().includes(keyword) ||
        (u.email ?? "").toLowerCase().includes(keyword)
    );
  }, [users, search]);

  const activeCount = users.filter((u) => u.isActive).length;
  const superAdminCount = users.filter((u) => u.role === "SuperAdmin").length;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditing(user);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSaved = (issued?: IssuedCredentials) => {
    closeForm();
    if (issued) setCredentials(issued);
    void load();
  };

  const toggleActive = async (user: AdminUser) => {
    const action = user.isActive ? "Disable" : "Enable";
    const ok = window.confirm(
      user.isActive
        ? `Disable ${user.userCode} (${user.name})? They will be signed out immediately and cannot log in.`
        : `Enable ${user.userCode} (${user.name})?`
    );
    if (!ok) return;

    try {
      await api.put(`/admin/users/${user.id}`, { isActive: !user.isActive });
      toast.success(`${action}d ${user.userCode}.`);
      void load();
    } catch (error) {
      toast.error(apiError(error, `Unable to ${action.toLowerCase()} the user.`));
    }
  };

  const handleDelete = async (user: AdminUser) => {
    const ok = window.confirm(
      `Permanently delete ${user.userCode} (${user.name})? This cannot be undone.`
    );
    if (!ok) return;

    try {
      const res = await api.delete(`/admin/users/${user.id}`);
      toast.success(res.data.message);
      void load();
    } catch (error) {
      toast.error(apiError(error, "Unable to delete the user."));
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
          <h2 className="mt-5 text-xl font-bold text-navy-950">Loading Users...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-[0_16px_40px_-20px_rgba(7,20,46,0.4)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-gold-500/12 blur-[90px]" />

        <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              <UserCog size={11} className="text-gold-400" />
              User Management
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Team <span className="text-gradient-gold">Access</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/60">
              Create login IDs for your internal staff and choose exactly what each person can see and do.
            </p>
          </div>

          <div className="flex gap-3">
            {[
              { label: "Users", value: users.length },
              { label: "Active", value: activeCount },
              { label: "Super Admins", value: superAdminCount },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-center backdrop-blur-xl"
              >
                <h2 className="text-2xl font-extrabold text-white">{card.value}</h2>
                <p className="text-[11px] text-white/50">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        {...fadeUp(0.05)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-navy-950">Manage Users</h2>
            <p className="text-xs text-slate-500">Add staff, change their access or reset a password.</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => void load()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCw size={14} />
              Refresh
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400"
            >
              <UserPlus size={14} />
              Add User
            </button>
          </div>
        </div>

        <div className="relative mt-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by login ID, name or email..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-navy-950 transition focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/15"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        {...fadeUp(0.1)}
        className="overflow-hidden rounded-xl border border-navy-950/5 bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">Login ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Access</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <UserCog size={40} className="mx-auto text-slate-300" />
                    <h3 className="mt-3 text-base font-bold text-slate-700">No users found</h3>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const isSelf = user.id === me.id;
                  const isSuper = user.role === "SuperAdmin";
                  const granted = user.permissions
                    .map((key) => permissionLabels.get(key) ?? key)
                    .join(", ");

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 transition-all duration-300 hover:bg-navy-50/50"
                    >
                      <td className="px-4 py-4">
                        <span className="rounded-md bg-navy-50 px-2.5 py-1 font-mono text-sm font-bold text-navy-800">
                          {user.userCode}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-navy-950">
                              {user.name}
                              {isSelf && (
                                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                  You
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-slate-500">{user.email || "No email"}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            isSuper ? "bg-gold-100 text-gold-700" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isSuper && <ShieldCheck size={11} />}
                          {isSuper ? "Super Admin" : "Staff"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {isSuper ? (
                          <span className="text-xs font-medium text-slate-600">Full access</span>
                        ) : user.permissions.length === 0 ? (
                          <span className="text-xs text-slate-400">Dashboard only</span>
                        ) : (
                          <span className="cursor-help text-xs font-medium text-slate-600" title={granted}>
                            {user.permissions.length} of {catalog.length} permissions
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                            }`}
                          >
                            {user.isActive ? "Active" : "Disabled"}
                          </span>

                          {user.mustChangePassword && (
                            <span className="text-[10px] font-medium text-amber-600">
                              Password change pending
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEdit(user)}
                            title="Edit details and permissions"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-800"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>

                          {!isSelf && (
                            <>
                              <button
                                onClick={() => setResetting(user)}
                                title="Set a new temporary password"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                <KeyRound size={13} />
                                Reset
                              </button>

                              <button
                                onClick={() => void toggleActive(user)}
                                title={user.isActive ? "Disable this account" : "Enable this account"}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                <Power size={13} />
                                {user.isActive ? "Disable" : "Enable"}
                              </button>

                              <button
                                onClick={() => void handleDelete(user)}
                                title="Delete this user"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                              >
                                <Trash2 size={13} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {formOpen && (
        <UserFormModal
          user={editing}
          isSelf={editing !== null && editing.id === me.id}
          catalog={catalog}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}

      {resetting && (
        <ResetPasswordModal
          user={resetting}
          onClose={() => setResetting(null)}
          onReset={(issued) => {
            setResetting(null);
            setCredentials(issued);
            void load();
          }}
        />
      )}

      {credentials && (
        <CredentialsModal credentials={credentials} onClose={() => setCredentials(null)} />
      )}
    </div>
  );
}

export default Users;
