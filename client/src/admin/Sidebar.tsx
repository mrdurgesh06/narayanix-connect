import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import logo from "../assets/logo.png";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "rememberAdmin"
    );

    navigate("/admin/login");

  };

  const menu = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },

    {
      title: "Contacts",
      icon: Users,
      path: "/admin/contacts",
    },

    {
      title: "Proposals",
      icon: FileText,
      path: "/admin/proposals",
    },

    {
  title: "Settings",
  icon: Settings,
  path: "/admin/settings",
},

  ];

  return (

    <aside className="flex min-h-screen w-80 flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white p-2 shadow-xl">

            <img src={logo} alt="NARAYANIX Connect" className="h-full w-full object-contain" />

          </div>

          <div>

            <h1 className="text-3xl font-black">

              NARAYANIX Admin

            </h1>

            <p className="mt-1 text-slate-400">

              Control Center

            </p>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={22}
              className="text-cyan-400"
            />

            <span className="font-semibold">

              Secure Admin Access

            </span>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">

            Authorized users only.

          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-3 p-6">

              {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              {({ isActive }) => (

                <>

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                        isActive
                          ? "bg-white/20"
                          : "bg-slate-800 group-hover:bg-slate-700"
                      }`}
                    >

                      <Icon size={22} />

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {item.title}

                      </h3>

                      <p
                        className={`text-xs ${
                          isActive
                            ? "text-blue-100"
                            : "text-slate-500"
                        }`}
                      >

                        Manage {item.title}

                      </p>

                    </div>

                  </div>

                  {isActive && (

                    <Sparkles
                      size={20}
                      className="text-yellow-300"
                    />

                  )}

                </>

              )}

            </NavLink>

          );

        })}

      </nav>

      {/* Bottom Section */}

      <div className="border-t border-slate-800 p-6 space-y-4">

              <Link
          to="/"
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        >

          <ArrowLeft size={20} />

          Back to Website

        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        >

          <LogOut size={20} />

          Logout

        </button>

        {/* Footer */}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">

          <div className="flex items-center justify-center gap-2">

            <ShieldCheck
              size={18}
              className="text-green-400"
            />

            <span className="text-sm font-semibold text-green-400">

              System Secure

            </span>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">

            NARAYANIX Connect
            <br />
            Admin Panel v2.0

          </p>

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;