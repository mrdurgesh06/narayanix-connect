import { Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./AdminAuthContext";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const isLoggedIn = Boolean(localStorage.getItem("adminToken"));

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // Loads the signed-in user (role + permissions) for everything inside the admin area.
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}

export default ProtectedRoute;
