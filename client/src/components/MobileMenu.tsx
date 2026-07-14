import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/#technology", label: "Technology", hash: "#technology" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function MobileMenu({ open, onClose }: Props) {
  const { pathname, hash } = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 z-50"
        >
          <div className="px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Menu
              </span>

              <button onClick={onClose} aria-label="Close menu">
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {links.map((link) => {
                const isActive = link.hash
                  ? pathname === "/" && hash === link.hash
                  : link.exact
                  ? pathname === "/" && !hash
                  : pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={`text-lg ${
                      isActive ? "font-semibold text-navy-800" : "text-slate-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/proposal"
              onClick={onClose}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gold-500 py-3.5 font-semibold text-navy-950 shadow-lg"
            >
              Book a Demo
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;