import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Download, Users, Search, RotateCw, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/api";

import type { Contact } from "./types";

import ContactSearch from "./ContactSearch";
import ContactTable from "./ContactTable";
import ContactModal from "./ContactModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const loadContacts = async () => {
    try {
      const res = await api.get("/admin/contacts");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    const keyword = search.toLowerCase();

    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.company.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.phone.toLowerCase().includes(keyword)
    );
  }, [contacts, search]);

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = async (contact: Contact) => {
    const ok = window.confirm(`Delete ${contact.name}?`);
    if (!ok) return;

    try {
      await api.delete(`/admin/contacts/${contact.id}`);
      toast.success("Contact deleted successfully.");
      loadContacts();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed.");
    }
  };

  const exportCSV = () => {
    if (filteredContacts.length === 0) {
      toast.error("No contacts available.");
      return;
    }

    const headers = ["Name", "Company", "Email", "Phone", "Date"];

    const rows = filteredContacts.map((item) => [
      item.name,
      item.company || "",
      item.email,
      item.phone,
      new Date(item.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Contacts exported successfully.");
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
          <h2 className="mt-5 text-xl font-bold text-navy-950">Loading Contacts...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-[0_16px_40px_-20px_rgba(7,20,46,0.4)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-gold-500/12 blur-[90px]" />

        <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              <Users size={11} className="text-gold-400" />
              Contact Management
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Customer <span className="text-gradient-gold">Enquiries</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/60">
              View, search, export and manage every customer enquiry
              received through your website.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-center backdrop-blur-xl">
            <CheckCircle2 size={20} className="mx-auto text-emerald-400" />
            <h2 className="mt-1.5 text-2xl font-extrabold text-white">
              {filteredContacts.length}
            </h2>
            <p className="text-[11px] text-white/50">Total Contacts</p>
          </div>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        {...fadeUp(0.05)}
        className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-navy-950">Manage Contacts</h2>
            <p className="text-xs text-slate-500">
              Search, export and manage customer enquiries.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={loadContacts}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCw size={14} />
              Refresh
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="mt-4">
          <ContactSearch search={search} setSearch={setSearch} />
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Total Contacts",
            value: filteredContacts.length,
            icon: Users,
            accent: false,
          },
          {
            label: "Search Status",
            value: search === "" ? "All" : "Filtered",
            icon: Search,
            accent: true,
          },
          {
            label: "System",
            value: "Online",
            icon: CheckCircle2,
            accent: false,
            status: true,
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            {...fadeUp(0.05 * i)}
            className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">{card.label}</p>
                <h2
                  className={`mt-1.5 text-xl font-extrabold ${
                    card.status
                      ? "text-emerald-600"
                      : card.accent
                      ? "text-gold-600"
                      : "text-navy-950"
                  }`}
                >
                  {card.value}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-white">
                <card.icon size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contacts Table */}
      <motion.div {...fadeUp(0.1)}>
        <ContactTable
          contacts={filteredContacts}
          onView={handleView}
          onDelete={handleDelete}
        />
      </motion.div>

      <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </div>
  );
}

export default Contacts;