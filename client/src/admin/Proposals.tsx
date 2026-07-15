import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, RefreshCw, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/api";

import ProposalModal from "./ProposalModal";

type Proposal = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const loadProposals = async () => {
    try {
      const res = await api.get("/admin/proposals");
      setProposals(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load proposals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const filteredProposals = useMemo(() => {
    const keyword = search.toLowerCase();

    return proposals.filter(
      (item) =>
        item.company.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.service.toLowerCase().includes(keyword)
    );
  }, [proposals, search]);

  const handleView = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  const handleDelete = async (proposal: Proposal) => {
    const ok = window.confirm(`Delete proposal from ${proposal.company}?`);
    if (!ok) return;

    try {
      await api.delete(`/admin/proposals/${proposal.id}`);
      toast.success("Proposal deleted successfully.");
      loadProposals();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
          <h2 className="mt-5 text-xl font-bold text-navy-950">Loading Proposals...</h2>
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
              <FileText size={11} className="text-gold-400" />
              Proposal Management
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Business <span className="text-gradient-gold">Proposals</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/60">
              Review, search and manage proposal requests submitted by your clients.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] px-6 py-4 text-center backdrop-blur-xl">
            <CheckCircle2 size={20} className="mx-auto text-emerald-400" />
            <h2 className="mt-1.5 text-2xl font-extrabold text-white">
              {filteredProposals.length}
            </h2>
            <p className="text-[11px] text-white/50">Total Proposals</p>
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
            <h2 className="text-lg font-extrabold text-navy-950">Manage Proposals</h2>
            <p className="text-xs text-slate-500">
              Search, review and manage all business proposals.
            </p>
          </div>

          <button
            onClick={loadProposals}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="relative mt-4">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by Company, Name, Email or Service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition duration-300 focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10"
          />
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Proposals", value: filteredProposals.length, icon: FileText, accent: false },
          { label: "Search Status", value: search === "" ? "All" : "Filtered", icon: Search, accent: true },
          { label: "System", value: "Online", icon: CheckCircle2, accent: false, status: true },
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
                    card.status ? "text-emerald-600" : card.accent ? "text-gold-600" : "text-navy-950"
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

      {/* Proposal Table */}
      <motion.div
        {...fadeUp(0.1)}
        className="overflow-hidden rounded-xl border border-navy-950/5 bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Service</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <FileText size={40} className="mx-auto text-slate-300" />
                    <h3 className="mt-3 text-base font-bold text-slate-700">
                      No Proposals Found
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Proposal requests will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProposals.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition-all duration-300 hover:bg-navy-50/50"
                  >
                    {/* Company */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-white">
                          {item.company.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-navy-950">{item.company}</h3>
                          <p className="text-xs text-slate-500">
                            {item.website || "No Website"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <h3 className="text-sm font-bold text-navy-950">{item.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-600">{item.email}</p>
                      <p className="text-xs text-slate-500">{item.phone}</p>
                    </td>

                    {/* Service */}
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                        {item.service}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.budget}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-xs font-medium text-slate-700">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-800"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                        >
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
      </motion.div>

      <ProposalModal proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />
    </div>
  );
}

export default Proposals;