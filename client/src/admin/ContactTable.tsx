import {
  Eye,
  Trash2,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

import type { Contact } from "./types";

type Props = {
  contacts: Contact[];
  onView: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};

function ContactTable({ contacts, onView, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy-950/5 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navy-950/5 px-5 py-4">
        <div>
          <h2 className="text-base font-extrabold text-navy-950">Customer Contacts</h2>
          <p className="text-xs text-slate-500">
            Latest enquiries received from your website.
          </p>
        </div>

        <div className="rounded-lg bg-navy-50 px-3 py-1.5">
          <span className="text-xs font-semibold text-navy-700">
            {contacts.length} Records
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-navy-950 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
              <th className="px-4 py-3 text-center text-xs font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-14 text-center">
                  <UserCircle2 size={40} className="mx-auto text-slate-300" />
                  <h3 className="mt-3 text-base font-bold text-slate-700">
                    No Contacts Found
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Customer enquiries will appear here.
                  </p>
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-navy-50/50"
                >
                  {/* Customer */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-white">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-navy-950">{item.name}</h3>
                        <span className="mt-1 inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-semibold text-gold-700">
                          New Lead
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-navy-700" />
                      <span className="text-sm font-medium text-slate-700">
                        {item.company || "No Company"}
                      </span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-navy-700" />
                        <span className="text-xs text-slate-700">{item.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-emerald-600" />
                        <span className="text-xs text-slate-700">{item.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-gold-600" />
                      <span className="text-xs font-medium text-slate-700">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onView(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-navy-800"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-red-700"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactTable;