import { useEffect, useMemo, useState } from "react";

import {
  Download,
  Users,
  Search,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/api";

import type { Contact } from "./types";

import ContactSearch from "./ContactSearch";
import ContactTable from "./ContactTable";
import ContactModal from "./ContactModal";

function Contacts() {

  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const loadContacts = async () => {

    try {

      const res =
        await api.get("/admin/contacts");

      setContacts(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to load contacts."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return contacts.filter((item) =>

        item.name
          .toLowerCase()
          .includes(keyword) ||

        item.company
          .toLowerCase()
          .includes(keyword) ||

        item.email
          .toLowerCase()
          .includes(keyword) ||

        item.phone
          .toLowerCase()
          .includes(keyword)

      );

    }, [contacts, search]);

  const handleView = (
    contact: Contact
  ) => {

    setSelectedContact(contact);

  };

  const handleDelete = async (
    contact: Contact
  ) => {

    const ok =
      window.confirm(
        `Delete ${contact.name}?`
      );

    if (!ok) return;

    try {

      await api.delete(
        `/admin/contacts/${contact.id}`
      );

      toast.success(
        "Contact deleted successfully."
      );

      loadContacts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed."
      );

    }

  };

  const exportCSV = () => {

    if (filteredContacts.length === 0) {

      toast.error(
        "No contacts available."
      );

      return;

    }

    const headers = [
      "Name",
      "Company",
      "Email",
      "Phone",
      "Date",
    ];

    const rows =
      filteredContacts.map(
        (item) => [

          item.name,

          item.company || "",

          item.email,

          item.phone,

          new Date(
            item.createdAt
          ).toLocaleDateString(),

        ]
      );

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob =
      new Blob(
        [csv],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "contacts.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success(
      "Contacts exported successfully."
    );

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900">

            Loading Contacts...

          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-10">

      {/* Hero Header */}

      <div className="overflow-hidden rounded-[34px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[33px] bg-white p-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">

                <Users size={18} />

                Contact Management

              </div>

              <h1 className="mt-6 text-5xl font-black text-slate-900">

                Customer

                <span className="text-blue-600">

                  {" "}Enquiries

                </span>

              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">

                View, search, export and manage every customer enquiry
                received through your website.

              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-8 text-center">

              <CheckCircle2
                size={34}
                className="mx-auto text-green-600"
              />

              <h2 className="mt-4 text-5xl font-black text-blue-600">

                {filteredContacts.length}

              </h2>

              <p className="mt-2 text-slate-500">

                Total Contacts

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Toolbar */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <h2 className="text-3xl font-black text-slate-900">

              Manage Contacts

            </h2>

            <p className="mt-2 text-slate-500">

              Search, export and manage customer enquiries.

            </p>

          </div>

          {/* Right Buttons */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={loadContacts}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow hover:bg-slate-50 transition"
            >

              <ArrowRight size={18} />

              Refresh

            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition duration-300"
            >

              <Download size={18} />

              Export CSV

            </button>

          </div>

        </div>

        {/* Search */}

        <div className="mt-8">

          <ContactSearch
            search={search}
            setSearch={setSearch}
          />

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        {/* Total */}

        <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Total Contacts

              </p>

              <h2 className="mt-3 text-5xl font-black text-blue-600">

                {filteredContacts.length}

              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">

              <Users
                size={32}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="rounded-3xl border border-cyan-100 bg-white p-7 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Search Status

              </p>

              <h2 className="mt-3 text-3xl font-black text-cyan-600">

                {search === ""
                  ? "All"
                  : "Filtered"}

              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">

              <Search
                size={30}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* System */}

        <div className="rounded-3xl border border-green-100 bg-white p-7 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                System

              </p>

              <h2 className="mt-3 text-3xl font-black text-green-600">

                Online

              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">

              <CheckCircle2
                size={30}
                className="text-white"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Contacts Table */}

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

        <ContactTable
          contacts={filteredContacts}
          onView={handleView}
          onDelete={handleDelete}
        />

      </div>

      <ContactModal
        contact={selectedContact}
        onClose={() =>
          setSelectedContact(null)
        }
      />

    </div>

  );

}

export default Contacts;