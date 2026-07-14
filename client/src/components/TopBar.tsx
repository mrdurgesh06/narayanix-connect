import {
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";

function TopBar() {

  const { settings } = useSettings();

  return (

    <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-11 items-center justify-between">

          {/* Left */}

          <div className="flex items-center gap-8 text-sm">

            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 transition hover:text-cyan-300"
            >

              <Phone size={15} />

              {settings.phone}

            </a>

            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 transition hover:text-cyan-300"
            >

              <Mail size={15} />

              {settings.email}

            </a>

            <div className="flex items-center gap-2">

              <Clock3 size={15} />

              {settings.workingHours}

            </div>

          </div>
                    {/* Right */}

          <div className="flex items-center gap-4">

            <span className="font-medium text-cyan-300">

              500+ Happy Clients

            </span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>

            <span className="text-sm text-slate-200">

              Available 24×7

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TopBar;