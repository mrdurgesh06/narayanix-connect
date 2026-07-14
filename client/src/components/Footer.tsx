import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

import Logo from "./Logo";
import Container from "./ui/Container";
import { useSettings } from "../context/SettingsContext";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Customer Experience", to: "/services" },
      { label: "Business Operations", to: "/services" },
      { label: "Sales Enablement", to: "/services" },
      { label: "Digital Engagement", to: "/services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", to: "/industries" },
      { label: "BFSI", to: "/industries" },
      { label: "E-commerce", to: "/industries" },
      { label: "Education", to: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Industries We Serve", to: "/industries" },
      { label: "Book a Demo", to: "/proposal" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Technology", to: "/#technology" },
    ],
  },
];

function Footer() {
  const { settings } = useSettings();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const socials = [
    { icon: FaLinkedinIn, href: settings.linkedin },
    { icon: FaFacebookF, href: settings.facebook },
    { icon: FaInstagram, href: settings.instagram },
    { icon: FaYoutube, href: settings.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -top-32 left-0 h-80 w-80 rounded-full bg-navy-700/20 blur-[110px]" />

      <Container className="relative py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Logo dark />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Technology-enabled customer experience, sales enablement and
              business operations for growing enterprises.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Stay in the loop
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold-500 text-navy-950 transition hover:bg-gold-400"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-emerald-400">Thanks — you're subscribed.</p>
              )}
            </form>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/50 transition hover:text-gold-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
          >
            <Phone size={15} className="text-gold-400" />
            {settings.phone}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
          >
            <Mail size={15} className="text-gold-400" />
            {settings.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <MapPin size={15} className="text-gold-400" />
            {settings.address}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p>{settings.copyright}</p>

          <div className="flex items-center gap-6">
            <Link to="/faq" className="transition hover:text-white/70">
              Privacy Policy
            </Link>
            <Link to="/faq" className="transition hover:text-white/70">
              Terms
            </Link>

            {/* Intentionally understated — not a normal-user entry point */}
            <Link
              to="/admin/login"
              className="text-[11px] text-white/20 transition hover:text-white/40"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
