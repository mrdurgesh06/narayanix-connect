import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  ArrowRight,
  ShieldCheck,
  Activity,
  BrainCircuit,
} from "lucide-react";

const highlights = [
  { icon: Activity, label: "Real-time performance dashboards" },
  { icon: BrainCircuit, label: "AI-assisted quality insights" },
  { icon: ShieldCheck, label: "Enterprise-grade access controls" },
];

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
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Left — branded panel */}
      <div className="relative hidden overflow-hidden bg-navy-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-32 left-[10%] h-96 w-96 rounded-full bg-navy-600/35 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-500/12 blur-[120px]" />

        <svg
          className="pointer-events-none absolute -right-20 bottom-0 h-[480px] w-[480px] opacity-[0.15]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <g stroke="url(#loginLotusStroke)" strokeWidth="1.2">
            <path d="M200 60 C170 130 170 200 200 260 C230 200 230 130 200 60Z" />
            <path d="M110 130 C150 170 180 210 200 260 C170 240 120 220 90 190 C70 165 80 145 110 130Z" />
            <path d="M290 130 C250 170 220 210 200 260 C230 240 280 220 310 190 C330 165 320 145 290 130Z" />
            <path d="M60 220 C120 230 165 245 200 270 C155 265 100 270 65 285 C40 260 40 235 60 220Z" />
            <path d="M340 220 C280 230 235 245 200 270 C245 265 300 270 335 285 C360 260 360 235 340 220Z" />
          </g>
          <defs>
            <linearGradient id="loginLotusStroke" x1="0" y1="0" x2="400" y2="400">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#123F94" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="NARAYANIX Connect" className="h-11 w-auto" />
            <div className="leading-none">
              <span className="block text-lg font-extrabold tracking-tight text-white">
                NARAYANIX
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.35em] text-gold-500">
                Connect
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <ShieldCheck size={13} className="text-gold-400" />
            Administrator Portal
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white">
            Manage your CX platform, all in one place.
          </h1>

          <p className="mt-4 text-white/60">
            Sign in to view live performance, manage leads and keep your
            program running at its best.
          </p>

          <div className="mt-9 space-y-4">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/[0.06] text-gold-400">
                  <item.icon size={16} />
                </span>
                <span className="text-sm font-medium text-white/75">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="relative text-xs text-white/30">
          © {new Date().getFullYear()} NARAYANIX Connect. All Rights Reserved.
        </p>
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-navy-800"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>

          {/* Logo — mobile only, since the branded panel is hidden below lg */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img src={logo} alt="NARAYANIX Connect" className="h-10 w-auto" />
            <div className="leading-none">
              <span className="block text-base font-extrabold tracking-tight text-navy-950">
                NARAYANIX
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">
                Connect
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-500">
            Sign in with your administrator credentials to continue.
          </p>

          <form onSubmit={login} className="mt-9">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="relative mb-5">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="you@narayanixconnect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-navy-950 transition focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/15"
              />
            </div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 text-navy-950 transition focus:border-navy-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-navy-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-8 mt-5 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-navy-700"
                />
                Remember Me
              </label>

              <button type="button" className="text-sm font-semibold text-navy-700 hover:text-gold-600">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-500 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                Secure Access
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="rounded-2xl border border-navy-950/5 bg-navy-50/60 p-4">
              <h3 className="text-sm font-bold text-navy-950">Administrator Portal</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                This portal is only for authorized administrators of{" "}
                <strong className="text-navy-800">NARAYANIX Connect</strong>. Unauthorized
                access attempts may be monitored and logged.
              </p>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Need help accessing your account?{" "}
            <Link to="/contact" className="font-semibold text-navy-700 hover:text-gold-600">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;