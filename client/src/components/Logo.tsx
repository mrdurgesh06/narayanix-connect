import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { useSettings } from "../context/SettingsContext";

type Props = {
  dark?: boolean;
};

function Logo({ dark = false }: Props) {
  const { settings } = useSettings();

  return (
    <Link to="/" className="group flex items-center gap-3">
      <img
        src={settings.logo || logo}
        alt={settings.companyName}
        className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
      />

      <div className="leading-none">
        <span
          className={`block text-xl font-extrabold tracking-tight ${
            dark ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]" : "text-navy-950"
          }`}
        >
          NARAYANIX
        </span>

        <span className="block text-[11px] font-bold uppercase tracking-[0.35em] text-gold-500">
          Connect
        </span>
      </div>
    </Link>
  );
}

export default Logo;
