import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useSettings } from "../context/SettingsContext";

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

function Settings() {

    const { refreshSettings } = useSettings();

  const [settings, setSettings] = useState({

    companyName: "NARAYANIX Connect",

    email: "info@narayanixconnect.com",

    phone: "+91 XXXXX XXXXX",

    address: "India",

    workingHours:
      "Monday - Saturday | 9:00 AM - 6:00 PM",

    logo: "",

    favicon: "",

    facebook: "",

    linkedin: "",

    instagram: "",

    youtube: "",

    whatsapp: "",

    copyright:
      "© 2026 NARAYANIX Connect",

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

  const [uploading, setUploading] = useState<{
    logo: boolean;
    favicon: boolean;
  }>({ logo: false, favicon: false });

  const handleUpload = async (
    type: "logo" | "favicon",
    file: File
  ) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const res = await api.post(
        `/upload/${type}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSettings((prev) => ({
        ...prev,
        [type]: res.data.image,
      }));

      toast.success(
        `${type === "logo" ? "Logo" : "Favicon"} uploaded. Click Save Settings to apply.`
      );
    } catch (error) {
      console.error(error);
      toast.error(`Unable to upload ${type}.`);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setSettings({

      ...settings,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = async () => {

  try {

    await api.post(
      "/settings",
      settings
    );

    await refreshSettings();

    toast.success(
      "Settings saved successfully."
    );

  } catch (error) {

    console.error(error);

    toast.error(
      "Unable to save settings."
    );

  }

};

  return (

    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-[32px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[31px] bg-white p-10">

          <h1 className="text-5xl font-black text-slate-900">

            Website Settings

          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-8">

            Manage all company information,
            branding and website configuration
            from one place.

          </p>

        </div>

      </div>

      {/* Company Information */}

      <div className="rounded-[32px] bg-white p-8 shadow-xl">

        <div className="flex items-center gap-4 mb-8">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

            <Building2
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h2 className="text-3xl font-black">

              Company Information

            </h2>

            <p className="text-slate-500 mt-1">

              Basic information about your company.

            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Company */}

          <div>

            <label className="mb-2 block font-semibold">

              Company Name

            </label>

            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-semibold">

              Email

            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
              />

            </div>

          </div>
                  </div>

        {/* Phone */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">

              Phone Number

            </label>

            <div className="relative">

              <Phone
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
              />

            </div>

          </div>

          {/* Working Hours */}

          <div>

            <label className="mb-2 block font-semibold">

              Working Hours

            </label>

            <div className="relative">

              <Clock3
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                name="workingHours"
                value={settings.workingHours}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
              />

            </div>

          </div>

        </div>

        {/* Address */}

        <div className="mt-6">

          <label className="mb-2 block font-semibold">

            Company Address

          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              rows={4}
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
            />

          </div>

        </div>

      </div>

      {/* Branding */}

      <div className="rounded-[32px] bg-white p-8 shadow-xl">

        <h2 className="mb-8 text-3xl font-black">

          Branding

        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">

              Company Logo

            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploading.logo}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload("logo", file);
              }}
              className="w-full rounded-xl border border-dashed border-slate-300 p-4 disabled:opacity-50"
            />

            {uploading.logo && (
              <p className="mt-2 text-sm text-slate-500">Uploading...</p>
            )}

            {settings.logo && !uploading.logo && (
              <img
                src={settings.logo}
                alt="Logo preview"
                className="mt-3 h-16 w-auto rounded-lg border border-slate-200 object-contain p-2"
              />
            )}

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              Favicon

            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploading.favicon}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload("favicon", file);
              }}
              className="w-full rounded-xl border border-dashed border-slate-300 p-4 disabled:opacity-50"
            />

            {uploading.favicon && (
              <p className="mt-2 text-sm text-slate-500">Uploading...</p>
            )}

            {settings.favicon && !uploading.favicon && (
              <img
                src={settings.favicon}
                alt="Favicon preview"
                className="mt-3 h-16 w-auto rounded-lg border border-slate-200 object-contain p-2"
              />
            )}

          </div>

        </div>

      </div>
            {/* Social Media */}

      <div className="rounded-[32px] bg-white p-8 shadow-xl">

        <h2 className="mb-8 text-3xl font-black">

          Social Media

        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">

              Facebook

            </label>

            <input
              type="text"
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              LinkedIn

            </label>

            <input
              type="text"
              name="linkedin"
              value={settings.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              Instagram

            </label>

            <input
              type="text"
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              YouTube

            </label>

            <input
              type="text"
              name="youtube"
              value={settings.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold">

              WhatsApp

            </label>

            <input
              type="text"
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              placeholder="+91XXXXXXXXXX"
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

        </div>

      </div>

      {/* Website Configuration */}

      <div className="rounded-[32px] bg-white p-8 shadow-xl">

        <h2 className="mb-8 text-3xl font-black">

          Website Configuration

        </h2>

        <div className="grid gap-6">

          <div>

            <label className="mb-2 block font-semibold">

              Copyright Text

            </label>

            <input
              type="text"
              name="copyright"
              value={settings.copyright}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              Google Maps URL

            </label>

            <input
              type="text"
              name="googleMap"
              value={settings.googleMap}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              Google Analytics ID

            </label>

            <input
              type="text"
              name="analytics"
              value={settings.analytics}
              onChange={handleChange}
              placeholder="G-XXXXXXXXXX"
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

          </div>

        </div>

      </div>
            {/* Save Settings */}

      <div className="rounded-[32px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[31px] bg-white p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-3xl font-black text-slate-900">

                Save Website Settings

              </h2>

              <p className="mt-3 max-w-2xl text-slate-600 leading-7">

                Save all company information, branding and website
                configuration. Backend integration will be connected
                in the next phase.

              </p>

            </div>

            <button
              onClick={handleSave}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >

              Save Settings

            </button>

          </div>

        </div>

      </div>

      {/* System Information */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h3 className="text-xl font-bold text-slate-900">

            Website

          </h3>

          <p className="mt-4 text-green-600 font-semibold">

            Running Successfully

          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h3 className="text-xl font-bold text-slate-900">

            Settings Status

          </h3>

          <p className="mt-4 text-blue-600 font-semibold">

            Ready for Backend

          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h3 className="text-xl font-bold text-slate-900">

            Version

          </h3>

          <p className="mt-4 text-purple-600 font-semibold">

            Admin Panel v2.1

          </p>

        </div>

      </div>

    </div>

  );

}

export default Settings;