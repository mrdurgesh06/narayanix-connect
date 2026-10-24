import axios from "axios";

// All API routes live under /api (the .NET backend also serves the website itself).
const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${apiBase}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach the admin JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the session has expired or is invalid, clear it and send the
// admin back to the login screen.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // New / reset accounts must set their own password before using anything else.
    if (
      error.response?.status === 403 &&
      error.response?.data?.code === "PASSWORD_CHANGE_REQUIRED" &&
      window.location.pathname !== "/admin/change-password"
    ) {
      window.location.href = "/admin/change-password";
    }

    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;
