import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import logo from "../assets/logo.png";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Contacts", icon: Users, path: "/admin/contacts" },
  { title: "Proposals", icon: FileText, path: "/admin/proposals" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

function Sidebar() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("adminSidebarCollapsed") === "true"
  );

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem("adminSidebarCollapsed", String(!prev));
      return !prev;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("rememberAdmin");
    navigate("/admin/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 232 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-screen flex-none flex-col overflow-hidden bg-navy-950 text-white shadow-xl"
    >
      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-3 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
      >
        {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
      </button>

      {/* Logo */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="NARAYANIX Connect" className="h-9 w-9 flex-none object-contain" />

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="text-sm font-extrabold leading-tight">NARAYANIX Admin</h1>
                <p className="text-[11px] text-white/40">Control Center</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!collapsed && (
          <div className="mt-4 rounded-lg border border-gold-500/20 bg-gold-500/[0.06] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="flex-none text-gold-400" />
              <span className="text-xs font-semibold text-white/85">Secure Admin Access</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.title : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gold-500 text-navy-950"
                    : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                } ${collapsed ? "justify-center" : ""}`
              }
            >
              <Icon size={18} className="flex-none" />

              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-2 border-t border-white/10 p-3">
        <Link
          to="/"
          title={collapsed ? "Back to Website" : undefined}
          className={`flex items-center gap-2.5 rounded-lg border border-white/15 px-2.5 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/[0.06] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ArrowLeft size={16} className="flex-none" />
          {!collapsed && <span>Back to Website</span>}
        </Link>

        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center gap-2.5 rounded-lg bg-red-600/90 px-2.5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={16} className="flex-none" />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && (
          <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400">System Secure</span>
            </div>
            <p className="mt-1 text-[10px] leading-4 text-white/35">
              NARAYANIX Connect · Admin v2.0
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;