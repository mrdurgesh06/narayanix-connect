import { MessageCircle } from "lucide-react";

import { useSettings } from "../context/SettingsContext";

function WhatsAppButton() {
  const { settings } = useSettings();

  const phone = (settings.whatsapp || settings.phone || "").replace(/\D/g, "");

  if (!phone) return null;

  const openWhatsApp = () => {
    const message =
      "Hello NARAYANIX Connect, I'd like to know more about your customer experience and business operations solutions.";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-500 px-6 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />

      <span className="hidden md:block font-semibold">Chat on WhatsApp</span>
    </button>
  );
}

export default WhatsAppButton;
