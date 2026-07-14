import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../api/api";

type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  logo: string;
  favicon: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  copyright: string;
  googleMap: string;
  analytics: string;
};

type SettingsContextType = {
  settings: Settings;
  refreshSettings: () => Promise<void>;
};

const defaultSettings: Settings = {
  companyName: "NARAYANIX Connect",
  email: "info@narayanixconnect.com",
  phone: "+91 XXXXX XXXXX",
  address: "India",
  workingHours: "Monday -Saturday | 9:00 AM - 6:00 PM",
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
};

const SettingsContext =
  createContext<SettingsContextType>(
    {} as SettingsContextType
  );

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [settings, setSettings] =
    useState<Settings>(defaultSettings);
      const refreshSettings = async () => {

    try {

      const res = await api.get("/settings");

      setSettings({

        ...defaultSettings,

        ...res.data,

      });

    } catch (error) {

      console.error(
        "Unable to load settings:",
        error
      );

    }

  };

  useEffect(() => {

    refreshSettings();

  }, []);
    return (

    <SettingsContext.Provider
      value={{
        settings,
        refreshSettings,
      }}
    >

      {children}

    </SettingsContext.Provider>

  );

}

export function useSettings() {

  return useContext(SettingsContext);

}