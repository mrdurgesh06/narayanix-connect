import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";

import api from "../api/api";
import { useAdminAuth } from "./AdminAuthContext";
import { PASSWORD_RULE, apiError, validatePassword } from "./auth";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 text-navy-950 transition focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/15";

function ChangePassword() {
  const navigate = useNavigate();
  const { admin, refresh, logout } = useAdminAuth();

  // Temporary password (new account / reset): the user cannot skip this screen.
  const forced = admin.mustChangePassword;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const problem = validatePassword(newPassword);
    if (problem) {
      toast.error(problem);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("The new password and its confirmation do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      toast.error("The new password must be different from the current one.");
      return;
    }

    setSaving(true);

    try {
      await api.post("/admin/change-password", { currentPassword, newPassword });
      toast.success("Password changed successfully.");
      await refresh();
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast.error(apiError(error, "Unable to change the password."));
    } finally {
      setSaving(false);
    }
  };

  const type = showPasswords ? "text" : "password";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
          <KeyRound size={22} />
        </div>

        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-navy-950">
          {forced ? "Set your own password" : "Change password"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Signed in as <strong className="text-navy-800">{admin.name}</strong> ({admin.userCode}).
          {forced && " For security, please replace your temporary password before continuing."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {forced ? "Temporary password" : "Current password"}
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={type}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">New password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={type}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-navy-700"
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">{PASSWORD_RULE}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm new password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={type}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex h-12 w-full items-center justify-center rounded-full bg-gold-500 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save new password"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          {forced ? (
            <span className="text-slate-400">Required to continue</span>
          ) : (
            <Link to="/admin/dashboard" className="font-semibold text-navy-700 hover:text-gold-600">
              Back to Dashboard
            </Link>
          )}

          <button onClick={logout} className="font-semibold text-slate-500 transition hover:text-red-600">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
