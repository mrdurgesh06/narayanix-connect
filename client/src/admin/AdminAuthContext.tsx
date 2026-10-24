import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../api/api";
import type { AdminUser } from "./auth";

interface AdminAuthValue {
  admin: AdminUser;
  isSuperAdmin: boolean;
  /** True for a Super Admin or when the permission is ticked for this user. */
  can: (permission: string) => boolean;
  /** Reload the signed-in user from the server (e.g. after changing the password). */
  refresh: () => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

/**
 * Loads the signed-in user (GET /admin/me) once and shares it with the admin panel.
 * The server is the real gatekeeper: this only decides what the UI shows.
 */
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("rememberAdmin");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const refresh = useCallback(async () => {
    try {
      const res = await api.get("/admin/me");
      setAdmin(res.data.admin as AdminUser);
    } catch {
      // A 401 is handled by the api interceptor (redirect to the login page).
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // New / reset accounts must choose their own password before using anything else.
  const mustChangePassword = admin?.mustChangePassword === true;

  useEffect(() => {
    if (mustChangePassword && location.pathname !== "/admin/change-password") {
      navigate("/admin/change-password", { replace: true });
    }
  }, [mustChangePassword, location.pathname, navigate]);

  const value = useMemo<AdminAuthValue | null>(() => {
    if (!admin) return null;

    const isSuperAdmin = admin.role === "SuperAdmin";

    return {
      admin,
      isSuperAdmin,
      can: (permission: string) => isSuperAdmin || admin.permissions.includes(permission),
      refresh,
      logout,
    };
  }, [admin, refresh, logout]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
          <h2 className="mt-5 text-lg font-bold text-navy-950">Loading your workspace...</h2>
        </div>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-extrabold text-navy-950">Unable to reach the server</h2>
          <p className="mt-2 text-sm text-slate-500">
            Please check your connection and try again.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setLoading(true);
                void refresh();
              }}
              className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
            >
              Try again
            </button>

            <button
              onClick={logout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthValue {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside <AdminAuthProvider>.");
  }

  return context;
}
