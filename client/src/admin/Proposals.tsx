import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Search,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
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

function Proposals() {

  const [proposals, setProposals] =
    useState<Proposal[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedProposal, setSelectedProposal] =
    useState<Proposal | null>(null);

  const loadProposals = async () => {

    try {

      const res =
        await api.get("/admin/proposals");

      setProposals(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load proposals."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadProposals();
  }, []);

  const filteredProposals =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return proposals.filter((item) =>

        item.company
          .toLowerCase()
          .includes(keyword) ||

        item.name
          .toLowerCase()
          .includes(keyword) ||

        item.email
          .toLowerCase()
          .includes(keyword) ||

        item.service
          .toLowerCase()
          .includes(keyword)

      );

    }, [proposals, search]);

  const handleView = (
    proposal: Proposal
  ) => {

    setSelectedProposal(proposal);

  };

  const handleDelete = async (
    proposal: Proposal
  ) => {

    const ok =
      window.confirm(
        `Delete proposal from ${proposal.company}?`
      );

    if (!ok) return;

    try {

      await api.delete(
        `/admin/proposals/${proposal.id}`
      );

      toast.success(
        "Proposal deleted successfully."
      );

      loadProposals();

    } catch (error) {

      console.error(error);

      toast.error(
        "Delete failed."
      );

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900">

            Loading Proposals...

          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-10">

      {/* Hero */}

      <div className="overflow-hidden rounded-[34px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[33px] bg-white p-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">

                <FileText size={18} />

                Proposal Management

              </div>

              <h1 className="mt-6 text-5xl font-black text-slate-900">

                Business

                <span className="text-blue-600">

                  {" "}Proposals

                </span>

              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">

                Review, search and manage proposal requests submitted by your clients.

              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-8 text-center">

              <CheckCircle2
                size={34}
                className="mx-auto text-green-600"
              />

              <h2 className="mt-4 text-5xl font-black text-blue-600">

                {filteredProposals.length}

              </h2>

              <p className="mt-2 text-slate-500">

                Total Proposals

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

              Manage Proposals

            </h2>

            <p className="mt-2 text-slate-500">

              Search, review and manage all business proposals.

            </p>

          </div>

          {/* Right Buttons */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={loadProposals}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow transition hover:bg-slate-50"
            >

              <RefreshCw size={18} />

              Refresh

            </button>

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-8">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by Company, Name, Email or Service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-5 text-lg outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

                Total Proposals

              </p>

              <h2 className="mt-3 text-5xl font-black text-blue-600">

                {filteredProposals.length}

              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">

              <FileText
                size={30}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Search Status */}

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

      {/* Proposal Table */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="px-6 py-5 text-left font-semibold">
                Company
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Contact
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Service
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Budget
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

                      {filteredProposals.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-20 text-center"
                >

                  <FileText
                    size={60}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-5 text-2xl font-bold text-slate-700">

                    No Proposals Found

                  </h3>

                  <p className="mt-3 text-slate-500">

                    Proposal requests will appear here.

                  </p>

                </td>

              </tr>

            ) : (

              filteredProposals.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-blue-50"
                >

                  {/* Company */}

                  <td className="px-6 py-6">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">

                        {item.company.charAt(0).toUpperCase()}

                      </div>

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">

                          {item.company}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {item.website || "No Website"}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-6">

                    <h3 className="font-bold text-slate-900">

                      {item.name}

                    </h3>

                    <p className="mt-2 text-slate-600">

                      {item.email}

                    </p>

                    <p className="text-sm text-slate-500">

                      {item.phone}

                    </p>

                  </td>

                  {/* Service */}

                  <td className="px-6 py-6">

                    <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                      {item.service}

                    </span>

                  </td>

                  {/* Budget */}

                  <td className="px-6 py-6">

                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                      {item.budget}

                    </span>

                  </td>

                  {/* Date */}

                  <td className="px-6 py-6 font-medium text-slate-700">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-6">

                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() => handleView(item)}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 font-semibold text-white shadow-lg transition hover:scale-105"
                      >

                        View

                      </button>

                      <button
                        onClick={() => handleDelete(item)}
                        className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2 font-semibold text-white shadow-lg transition hover:scale-105"
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

      <ProposalModal
        proposal={selectedProposal}
        onClose={() =>
          setSelectedProposal(null)
        }
      />

    </div>

  );

}

export default Proposals;