import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import api from "../api/api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/admin/login", {
        email: email.trim(),
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      if (remember) {
        localStorage.setItem("rememberAdmin", "true");
      } else {
        localStorage.removeItem("rememberAdmin");
      }

      navigate("/admin/dashboard");
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Invalid email or password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 flex items-center justify-center px-5">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Website
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center py-8 px-6">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg p-2">

              <img src={logo} alt="NARAYANIX Connect" className="h-full w-full object-contain" />

            </div>

            <h1 className="mt-5 text-3xl font-bold">
              Admin Login
            </h1>

            <p className="mt-2 text-blue-100">
              NARAYANIX Connect
            </p>

          </div>

          <form
            onSubmit={login}
            className="p-8"
          >
            {/* Email */}

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative mb-5">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

            </div>

            {/* Password */}

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
              >

                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

            {/* Remember + Forgot */}

            <div className="flex items-center justify-between mt-5 mb-7">

              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  className="accent-blue-600"
                />

                Remember Me

              </label>

              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </button>

            </div>
                        {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold transition duration-300 shadow-lg"
            >

              {loading ? "Signing In..." : "Login"}

            </button>

            {/* Divider */}

            <div className="relative my-7">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-slate-200"></div>

              </div>

              <div className="relative flex justify-center">

                <span className="bg-white px-4 text-sm text-slate-400">

                  Secure Admin Access

                </span>

              </div>

            </div>

            {/* Information Box */}

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

              <h3 className="font-semibold text-slate-800">

                Administrator Portal

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">

                This portal is only for authorized administrators of
                <strong> NARAYANIX Connect</strong>. Unauthorized
                access attempts may be monitored and logged.

              </p>

            </div>
                      </form>

          {/* Footer */}

          <div className="border-t border-slate-200 bg-slate-50 px-8 py-5">

            <div className="flex flex-col items-center justify-center text-center gap-2">

              <p className="text-sm text-slate-600">

                Need help accessing your account?

              </p>

              <Link
                to="/contact"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Contact Support
              </Link>

            </div>

          </div>

        </div>

        {/* Copyright */}

        <p className="mt-6 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} NARAYANIX Connect.
          <br />
          All Rights Reserved.

        </p>

      </div>

    </div>
      );
}

export default Login;
          