import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/#technology", label: "Technology", hash: "#technology" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function DesktopMenu() {
  const { pathname, hash } = useLocation();

  return (
    <div className="hidden lg:flex items-center gap-10">
      <nav className="flex items-center gap-8">
        {links.map((link) => {
          // Links with a hash (like Technology) are only "active" when that
          // exact hash is present. "Home" is only active with no hash at
          // all — otherwise both would falsely match together, since they
          // share the same "/" pathname.
          const isActive = link.hash
            ? pathname === "/" && hash === link.hash
            : link.exact
            ? pathname === "/" && !hash
            : pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`group relative py-2 text-[15px] font-semibold transition-colors duration-200 ${
                isActive ? "text-navy-800" : "text-slate-700 hover:text-navy-800"
              }`}
            >
              <span className="relative inline-block">
                {link.label}

                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-gold-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </Link>
          );
        })}
      </nav>

      <Link
        to="/proposal"
        className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-[0_8px_24px_-8px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_14px_30px_-8px_rgba(212,175,55,0.75)]"
      >
        Book a Demo
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export default DesktopMenu;