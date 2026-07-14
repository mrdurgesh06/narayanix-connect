import {
  X,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  Copy,
} from "lucide-react";

import toast from "react-hot-toast";

import type { Contact } from "./types";

type Props = {
  contact: Contact | null;
  onClose: () => void;
};

function ContactModal({
  contact,
  onClose,
}: Props) {

  if (!contact) return null;

  const copyText = async (
    text: string,
    label: string
  ) => {

    try {

      await navigator.clipboard.writeText(text);

      toast.success(
        `${label} copied`
      );

    } catch {

      toast.error(
        "Unable to copy"
      );

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

      <div className="w-full max-w-4xl overflow-hidden rounded-[34px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[33px] bg-white">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-bold text-white shadow-xl">

                {contact.name.charAt(0).toUpperCase()}

              </div>

              <div>

                <h2 className="text-3xl font-black text-slate-900">

                  {contact.name}

                </h2>

                <p className="mt-2 text-slate-500">

                  Customer Enquiry Details

                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-2xl bg-slate-100 p-3 transition hover:bg-red-100 hover:text-red-600"
            >

              <X size={26} />

            </button>

          </div>

          {/* Content */}

          <div className="p-8">

            <div className="grid gap-6 md:grid-cols-2">

                          {/* Company */}

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center gap-3">

                  <Building2
                    size={22}
                    className="text-blue-600"
                  />

                  <span className="text-slate-500">

                    Company

                  </span>

                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">

                  {contact.company || "No Company"}

                </h3>

              </div>

              {/* Email */}

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Mail
                      size={22}
                      className="text-blue-600"
                    />

                    <span className="text-slate-500">

                      Email

                    </span>

                  </div>

                  <button
                    onClick={() =>
                      copyText(
                        contact.email,
                        "Email"
                      )
                    }
                    className="rounded-lg bg-slate-100 p-2 transition hover:bg-blue-100"
                  >

                    <Copy size={16} />

                  </button>

                </div>

                <h3 className="mt-4 break-all text-lg font-semibold text-slate-900">

                  {contact.email}

                </h3>

              </div>

              {/* Phone */}

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Phone
                      size={22}
                      className="text-green-600"
                    />

                    <span className="text-slate-500">

                      Phone

                    </span>

                  </div>

                  <button
                    onClick={() =>
                      copyText(
                        contact.phone,
                        "Phone"
                      )
                    }
                    className="rounded-lg bg-slate-100 p-2 transition hover:bg-green-100"
                  >

                    <Copy size={16} />

                  </button>

                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">

                  {contact.phone}

                </h3>

              </div>

              {/* Date */}

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center gap-3">

                  <CalendarDays
                    size={22}
                    className="text-orange-500"
                  />

                  <span className="text-slate-500">

                    Submitted On

                  </span>

                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">

                  {new Date(
                    contact.createdAt
                  ).toLocaleString()}

                </h3>

              </div>

            </div>

            {/* Message */}

            <div className="mt-8 rounded-3xl border border-slate-200 p-6">

              <div className="flex items-center gap-3">

                <MessageSquare
                  size={22}
                  className="text-blue-600"
                />

                <h3 className="text-2xl font-bold text-slate-900">

                  Customer Message

                </h3>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6 whitespace-pre-wrap leading-8 text-slate-700">

                              {contact.message}

              </div>

            </div>

            {/* Footer */}

            <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  Customer enquiry received through the website.

                </p>

              </div>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    copyText(
                      contact.email,
                      "Email"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                  <Mail size={18} />

                  Copy Email

                </button>

                <button
                  onClick={() =>
                    copyText(
                      contact.phone,
                      "Phone"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                >

                  <Phone size={18} />

                  Copy Phone

                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >

                  <X size={18} />

                  Close

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ContactModal;