import { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Eye, EyeOff, KeyRound, RefreshCw, X } from "lucide-react";

import api from "../api/api";
import { PASSWORD_RULE, apiError, generatePassword, validatePassword } from "./auth";
import type { AdminUser, IssuedCredentials } from "./auth";

async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  } catch {
    toast.error("Unable to copy");
  }
}

/* ===========================================================
   Shown once after creating a user / resetting a password
=========================================================== */

type CredentialsProps = {
  credentials: IssuedCredentials;
  onClose: () => void;
};

export function CredentialsModal({ credentials, onClose }: CredentialsProps) {
  const loginUrl = `${window.location.origin}/admin/login`;

  const shareText = [
    `NARAYANIX Connect admin login`,
    `Login ID: ${credentials.userCode}`,
    `Temporary password: ${credentials.password}`,
    `Login page: ${loginUrl}`,
    `You will be asked to set your own password at the first login.`,
  ].join("\n");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-navy-950">
              {credentials.reason === "created" ? "User created" : "Password reset"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Share these details with <strong className="text-navy-800">{credentials.name}</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Login ID</span>
              <button
                onClick={() => copyText(credentials.userCode, "Login ID")}
                aria-label="Copy login ID"
                className="rounded-lg bg-slate-100 p-1.5 transition hover:bg-blue-100"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="mt-1 font-mono text-2xl font-extrabold tracking-wide text-navy-950">
              {credentials.userCode}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                Temporary password
              </span>
              <button
                onClick={() => copyText(credentials.password, "Password")}
                aria-label="Copy password"
                className="rounded-lg bg-slate-100 p-1.5 transition hover:bg-blue-100"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="mt-1 break-all font-mono text-lg font-bold text-navy-950">{credentials.password}</p>
          </div>

          <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-xs leading-5 text-amber-800">
            This password is shown <strong>only now</strong> and cannot be viewed again later (you can always
            reset it). The user must choose their own password at the first login.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            onClick={() => copyText(shareText, "Login details")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Copy size={14} />
            Copy all
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   Super Admin sets a new temporary password for a user
=========================================================== */

type ResetProps = {
  user: AdminUser;
  onClose: () => void;
  onReset: (credentials: IssuedCredentials) => void;
};

export function ResetPasswordModal({ user, onClose, onReset }: ResetProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const problem = validatePassword(password);
    if (problem) {
      toast.error(problem);
      return;
    }

    setSaving(true);

    try {
      await api.post(`/admin/users/${user.id}/reset-password`, { newPassword: password });
      onReset({ userCode: user.userCode, name: user.name, password, reason: "reset" });
    } catch (error) {
      toast.error(apiError(error, "Unable to reset the password."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-navy-950 text-gold-400">
              <KeyRound size={18} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-navy-950">Reset password</h2>
              <p className="mt-1 text-sm text-slate-500">
                {user.name} · <span className="font-mono">{user.userCode}</span>
              </p>
            </div>
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

        <div className="px-6 py-5">
          <label className="mb-1.5 block text-sm font-semibold text-navy-950">New temporary password</label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-3.5 pr-11 font-mono text-sm text-navy-950 transition focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/15"
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
            {PASSWORD_RULE} The user must change it at the next login.
          </p>
        </div>

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
            {saving ? "Resetting..." : "Reset password"}
          </button>
        </div>
      </form>
    </div>
  );
}
