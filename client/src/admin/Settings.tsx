import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import toast from "react-hot-toast";
import { useSettings } from "../context/SettingsContext";

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Share2,
  Globe2,
  Save,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Compact labeled text input, optionally with a leading icon.
function Field({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-950">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          {...props}
          className={`w-full rounded-lg border border-slate-200 py-2.5 text-sm text-navy-950 outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10 ${
            Icon ? "pl-10 pr-3.5" : "px-3.5"
          }`}
        />
      </div>
    </div>
  );
}

function Settings() {
  const { refreshSettings } = useSettings();

  const [settings, setSettings] = useState({
    companyName: "NARAYANIX Connect",
    email: "info@narayanixconnect.com",
    phone: "+91 XXXXX XXXXX",
    address: "India",
    workingHours: "Monday - Saturday | 9:00 AM - 6:00 PM",
    logo: "",
    favicon: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
    copyright: "© 2026 NARAYANIX Connect",
    googleMap: "",
    analytics: "",
  });

  const loadSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load settings.");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const [uploading, setUploading] = useState<{ logo: boolean; favicon: boolean }>({
    logo: false,
    favicon: false,
  });

  const handleUpload = async (type: "logo" | "favicon", file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const res = await api.post(`/upload/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSettings((prev) => ({ ...prev, [type]: res.data.image }));
      toast.success(`${type === "logo" ? "Logo" : "Favicon"} uploaded. Click Save Settings to apply.`);
    } catch (error) {
      console.error(error);
      toast.error(`Unable to upload ${type}.`);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.post("/settings", settings);
      await refreshSettings();
      toast.success("Settings saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to save settings.");
    }
  };

  const socialFields = [
    { name: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
    { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/..." },
    { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
    { name: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-[0_16px_40px_-20px_rgba(7,20,46,0.4)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-gold-500/12 blur-[90px]" />

        <div className="relative">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Website <span className="text-gradient-gold">Settings</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            Manage all company information, branding and website configuration
            from one place.
          </p>
        </div>
      </motion.div>

      {/* Company Information */}
      <motion.div
        {...fadeUp(0.05)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
            <Building2 size={18} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-navy-950">Company Information</h2>
            <p className="text-xs text-slate-500">Basic information about your company.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Company Name"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
          />
          <Field
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
          />
          <Field
            label="Phone Number"
            icon={Phone}
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />
          <Field
            label="Working Hours"
            icon={Clock3}
            name="workingHours"
            value={settings.workingHours}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-semibold text-navy-950">
            Company Address
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-3 text-slate-400" />
            <textarea
              rows={3}
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-navy-950 outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10"
            />
          </div>
        </div>
      </motion.div>

      {/* Branding */}
      <motion.div
        {...fadeUp(0.08)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="mb-5 text-lg font-extrabold text-navy-950">Branding</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {(["logo", "favicon"] as const).map((type) => (
            <div key={type}>
              <label className="mb-1.5 block text-sm font-semibold text-navy-950">
                {type === "logo" ? "Company Logo" : "Favicon"}
              </label>

              <input
                type="file"
                accept="image/*"
                disabled={uploading[type]}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(type, file);
                }}
                className="w-full rounded-lg border border-dashed border-slate-300 p-3 text-sm disabled:opacity-50"
              />

              {uploading[type] && (
                <p className="mt-1.5 text-xs text-slate-500">Uploading...</p>
              )}

              {settings[type] && !uploading[type] && (
                <img
                  src={settings[type]}
                  alt={`${type} preview`}
                  className="mt-2.5 h-12 w-auto rounded-lg border border-slate-200 object-contain p-1.5"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div
        {...fadeUp(0.11)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
            <Share2 size={18} />
          </div>
          <h2 className="text-lg font-extrabold text-navy-950">Social Media</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {socialFields.map((field) => (
            <Field
              key={field.name}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              value={settings[field.name as keyof typeof settings]}
              onChange={handleChange}
            />
          ))}

          <div className="md:col-span-2">
            <Field
              label="WhatsApp"
              name="whatsapp"
              placeholder="+91XXXXXXXXXX"
              value={settings.whatsapp}
              onChange={handleChange}
            />
          </div>
        </div>
      </motion.div>

      {/* Website Configuration */}
      <motion.div
        {...fadeUp(0.14)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
            <Globe2 size={18} />
          </div>
          <h2 className="text-lg font-extrabold text-navy-950">Website Configuration</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field
              label="Copyright Text"
              name="copyright"
              value={settings.copyright}
              onChange={handleChange}
            />
          </div>
          <Field
            label="Google Maps URL"
            name="googleMap"
            placeholder="https://maps.google.com/..."
            value={settings.googleMap}
            onChange={handleChange}
          />
          <Field
            label="Google Analytics ID"
            name="analytics"
            placeholder="G-XXXXXXXXXX"
            value={settings.analytics}
            onChange={handleChange}
          />
        </div>
      </motion.div>

      {/* Save Settings */}
      <motion.div
        {...fadeUp(0.17)}
        className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-[0_16px_40px_-20px_rgba(7,20,46,0.4)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-navy-600/30 blur-[90px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">Save Website Settings</h2>
            <p className="mt-1.5 max-w-xl text-sm text-white/60">
              Changes are saved directly to your database and reflected on the
              live site immediately.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </motion.div>

      {/* System Information */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Website", value: "Running Successfully", tone: "text-emerald-600" },
          { label: "Settings Status", value: "Connected to Database", tone: "text-navy-700" },
          { label: "Version", value: "Admin Panel v2.1", tone: "text-gold-600" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            {...fadeUp(0.05 * i)}
            className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-navy-950">{item.label}</h3>
            <p className={`mt-2 text-sm font-semibold ${item.tone}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Settings;