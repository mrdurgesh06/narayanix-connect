import { Outlet } from "react-router-dom";
import {
  Bell,
  Search,
} from "lucide-react";

import Sidebar from "./Sidebar";

function AdminLayout() {

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-8">

            {/* Left */}

            <div>

              <h1 className="text-3xl font-black text-slate-900">

                Admin Dashboard

              </h1>

              <p className="mt-1 text-slate-500">

                Welcome back to NARAYANIX Connect

              </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

              {/* Search */}

              <div className="relative hidden lg:block">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-72 rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              {/* Notification */}

              <button className="relative rounded-2xl bg-slate-100 p-3 transition hover:bg-blue-100">

                <Bell
                  size={22}
                  className="text-slate-700"
                />

                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

              </button>

              {/* Admin */}

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">

                  A

                </div>

                <div className="hidden md:block">

                  <h3 className="font-bold text-slate-900">

                    Administrator

                  </h3>

                  <p className="text-sm text-slate-500">

                    Super Admin

                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto p-8">

                  <div className="mx-auto max-w-[1700px]">

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;