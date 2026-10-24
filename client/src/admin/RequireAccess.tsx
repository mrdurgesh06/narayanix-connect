import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

import { useAdminAuth } from "./AdminAuthContext";

type Props = {
  /** Permission key the page needs (a Super Admin always passes). */
  permission?: string;
  /** Page is only for Super Admins (e.g. user management). */
  superAdminOnly?: boolean;
  children: React.ReactNode;
};

function RequireAccess({ permission, superAdminOnly, children }: Props) {
  const { can, isSuperAdmin } = useAdminAuth();

  const allowed = superAdminOnly ? isSuperAdmin : permission ? can(permission) : true;

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
          <Lock size={24} />
        </div>

        <h2 className="mt-5 text-lg font-extrabold text-navy-950">You don't have access to this page</h2>

        <p className="mt-2 text-sm text-slate-500">
          Please ask your Super Admin to enable it for your account.
        </p>

        <Link
          to="/admin/dashboard"
          className="mt-6 inline-block rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default RequireAccess;
