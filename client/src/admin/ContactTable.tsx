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

function ContactTable({
  contacts,
  onView,
  onDelete,
}: Props) {

  return (

    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

        <div>

          <h2 className="text-2xl font-black text-slate-900">

            Customer Contacts

          </h2>

          <p className="mt-2 text-slate-500">

            Latest enquiries received from your website.

          </p>

        </div>

        <div className="rounded-2xl bg-blue-50 px-5 py-3">

          <span className="text-sm font-semibold text-blue-700">

            {contacts.length} Records

          </span>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="px-6 py-5 text-left font-semibold">

                Customer

              </th>

              <th className="px-6 py-5 text-left font-semibold">

                Company

              </th>

              <th className="px-6 py-5 text-left font-semibold">

                Contact

              </th>

              <th className="px-6 py-5 text-left font-semibold">

                Date

              </th>

              <th className="px-6 py-5 text-center font-semibold">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

                      {contacts.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-20 text-center"
                >

                  <UserCircle2
                    size={60}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-5 text-2xl font-bold text-slate-700">

                    No Contacts Found

                  </h3>

                  <p className="mt-3 text-slate-500">

                    Customer enquiries will appear here.

                  </p>

                </td>

              </tr>

            ) : (

              contacts.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-blue-50"
                >

                  {/* Customer */}

                  <td className="px-6 py-6">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">

                        {item.name.charAt(0).toUpperCase()}

                      </div>

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">

                          {item.name}

                        </h3>

                        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                          New Lead

                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Company */}

                  <td className="px-6 py-6">

                    <div className="flex items-center gap-3">

                      <Building2
                        size={18}
                        className="text-blue-600"
                      />

                      <span className="font-medium text-slate-700">

                        {item.company || "No Company"}

                      </span>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-6">

                    <div className="space-y-3">

                      <div className="flex items-center gap-3">

                        <Mail
                          size={16}
                          className="text-blue-600"
                        />

                        <span className="text-slate-700">

                          {item.email}

                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <Phone
                          size={16}
                          className="text-green-600"
                        />

                        <span className="text-slate-700">

                          {item.phone}

                        </span>

                      </div>

                    </div>

                  </td>

                  {/* Date */}

                  <td className="px-6 py-6">

                    <div className="flex items-center gap-3">

                      <CalendarDays
                        size={18}
                        className="text-orange-500"
                      />

                      <span className="font-medium text-slate-700">

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}

                      </span>

                    </div>

                  </td>

                  {/* Actions */}
                                    <td className="px-6 py-6">

                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() => onView(item)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                      >

                        <Eye size={18} />

                        View

                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                      >

                        <Trash2 size={18} />

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