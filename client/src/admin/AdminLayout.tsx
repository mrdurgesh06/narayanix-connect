import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6 lg:px-8">
            {/* Left */}
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Admin Dashboard
              </h1>

              <p className="mt-0.5 text-sm text-slate-500">
                Welcome back to{" "}
                <span className="font-medium text-slate-700">
                  NARAYANIX Connect
                </span>
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden lg:block">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Notification */}
              <button className="relative rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50">
                <Bell size={20} className="text-slate-700" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md">
                {/* Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1F3A] via-[#163B6C] to-[#C9A227] text-base font-bold text-white shadow-md">
                  A
                </div>

                {/* Details */}
                <div className="hidden md:block leading-tight">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Administrator
                  </h3>

                  <p className="text-xs font-medium tracking-wide text-amber-600">
                    Super Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-[1700px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;