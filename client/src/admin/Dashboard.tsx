import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Users,
  FileText,
  Activity,
  Server,
  TrendingUp,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Clock3,
  Briefcase,
} from "lucide-react";

import api from "../api/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
};

type Proposal = {
  id: string;
  company: string;
  name: string;
  service: string;
};

type DashboardData = {
  totalContacts: number;
  totalProposals: number;
  latestContacts: Contact[];
  latestProposals: Proposal[];
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalContacts: 0,
    totalProposals: 0,
    latestContacts: [],
    latestProposals: [],
  });

  const [loading, setLoading] = useState(true);

  const chartData = [
    { name: "Contacts", value: data.totalContacts },
    { name: "Proposals", value: data.totalProposals },
    { name: "Leads", value: data.totalContacts + data.totalProposals },
  ];

  const loadDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "Total Contacts",
      value: data.totalContacts,
      badge: "Active Leads",
      badgeIcon: TrendingUp,
      icon: Users,
      accent: false,
    },
    {
      label: "Total Proposals",
      value: data.totalProposals,
      badge: "Business Requests",
      badgeIcon: Briefcase,
      icon: FileText,
      accent: false,
    },
    {
      label: "Active Leads",
      value: data.totalContacts + data.totalProposals,
      badge: "Potential Clients",
      badgeIcon: UserPlus,
      icon: UserPlus,
      accent: true,
    },
    {
      label: "Server Status",
      value: "Online",
      badge: "Running Smoothly",
      badgeIcon: null,
      icon: Server,
      accent: false,
      status: true,
    },
    {
      label: "Website Activity",
      value: "Active",
      badge: "Receiving Requests",
      badgeIcon: Activity,
      icon: Activity,
      accent: false,
    },
    {
      label: "Business Growth",
      value: "+24%",
      badge: "This Month",
      badgeIcon: TrendingUp,
      icon: TrendingUp,
      accent: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-navy-700" />
          <h2 className="mt-6 text-xl font-bold text-navy-950">Loading Dashboard...</h2>
          <p className="mt-1.5 text-sm text-slate-500">Fetching latest business data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Premium Header */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-[0_16px_40px_-20px_rgba(7,20,46,0.4)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-gold-500/12 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-navy-600/30 blur-[90px]" />

        <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              <ShieldCheck size={11} className="text-gold-400" />
              NARAYANIX Admin Dashboard
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Welcome Back, <span className="text-gradient-gold">Administrator</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/60">
              Monitor enquiries, proposal requests and system performance
              from one centralized dashboard.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center backdrop-blur-xl">
              <Clock3 size={18} className="mx-auto text-gold-400" />
              <h3 className="mt-1.5 text-lg font-extrabold text-white">24×7</h3>
              <p className="text-[11px] text-white/50">Monitoring</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center backdrop-blur-xl">
              <TrendingUp size={18} className="mx-auto text-emerald-400" />
              <h3 className="mt-1.5 text-lg font-extrabold text-white">Live</h3>
              <p className="text-[11px] text-white/50">Business Data</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            {...fadeUp(0.04 * i)}
            whileHover={{ y: -4 }}
            className="group rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_30px_-16px_rgba(11,46,109,0.2)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>

                <h2
                  className={`mt-2 text-2xl font-extrabold ${
                    card.accent ? "text-gold-600" : "text-navy-950"
                  }`}
                >
                  {card.value}
                </h2>

                <div
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    card.status
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-navy-50 text-navy-700"
                  }`}
                >
                  {card.status ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  ) : (
                    card.badgeIcon && <card.badgeIcon size={12} />
                  )}
                  {card.badge}
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                <card.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Recent Contacts */}
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-navy-950">Recent Contacts</h2>
              <p className="text-xs text-slate-500">Latest customer enquiries</p>
            </div>

            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-navy-800"
            >
              View All
              <ArrowRight size={13} />
            </Link>
          </div>

          {data.latestContacts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
              <Users size={32} className="mx-auto text-slate-300" />
              <h3 className="mt-3 text-base font-bold text-slate-700">No Contacts Yet</h3>
              <p className="mt-1 text-xs text-slate-500">New enquiries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.latestContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="rounded-lg border border-navy-950/5 p-3 transition-all duration-300 hover:border-gold-500/30 hover:bg-navy-50/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-navy-950">
                        {contact.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {contact.company || "No Company"}
                      </p>
                      <p className="truncate text-xs text-navy-700">{contact.email}</p>
                    </div>

                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-navy-950 text-sm font-bold text-white">
                      {contact.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Proposals */}
        <motion.div
          {...fadeUp(0.12)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-navy-950">Recent Proposals</h2>
              <p className="text-xs text-slate-500">Latest proposal requests</p>
            </div>

            <Link
              to="/admin/proposals"
              className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-2 text-xs font-semibold text-navy-950 transition hover:bg-gold-400"
            >
              View All
              <ArrowRight size={13} />
            </Link>
          </div>

          {data.latestProposals.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
              <FileText size={32} className="mx-auto text-slate-300" />
              <h3 className="mt-3 text-base font-bold text-slate-700">No Proposals Yet</h3>
              <p className="mt-1 text-xs text-slate-500">
                Proposal requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.latestProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="rounded-lg border border-navy-950/5 p-3 transition-all duration-300 hover:border-gold-500/30 hover:bg-navy-50/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-navy-950">
                        {proposal.company}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {proposal.name}
                      </p>
                      <span className="mt-1.5 inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-semibold text-gold-700">
                        {proposal.service}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gold-500 text-sm font-bold text-navy-950">
                      {proposal.company.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Dashboard Charts */}
      <div className="grid gap-4 xl:grid-cols-2">
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
        >
          <h2 className="mb-4 text-lg font-extrabold text-navy-950">Contacts Overview</h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5eaf3" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} allowDecimals={false} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5eaf3",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" fill="#123F94" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.12)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
        >
          <h2 className="mb-4 text-lg font-extrabold text-navy-950">Business Overview</h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5eaf3" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} allowDecimals={false} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5eaf3",
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 xl:grid-cols-3">
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)] xl:col-span-2"
        >
          <h2 className="text-lg font-extrabold text-navy-950">Quick Actions</h2>
          <p className="text-xs text-slate-500">Frequently used admin shortcuts.</p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link
              to="/admin/contacts"
              className="group rounded-xl border border-navy-950/5 bg-navy-50/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-950"
            >
              <Users size={22} className="text-navy-700 group-hover:text-gold-400" />
              <h3 className="mt-2.5 text-sm font-bold text-navy-950 group-hover:text-white">
                Manage Contacts
              </h3>
              <p className="mt-1 text-xs text-slate-500 group-hover:text-white/60">
                View, search and manage all customer enquiries.
              </p>
            </Link>

            <Link
              to="/admin/proposals"
              className="group rounded-xl border border-navy-950/5 bg-navy-50/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-950"
            >
              <FileText size={22} className="text-navy-700 group-hover:text-gold-400" />
              <h3 className="mt-2.5 text-sm font-bold text-navy-950 group-hover:text-white">
                Manage Proposals
              </h3>
              <p className="mt-1 text-xs text-slate-500 group-hover:text-white/60">
                Review and respond to proposal requests.
              </p>
            </Link>

            <div className="rounded-xl border border-navy-950/5 bg-navy-50/60 p-4">
              <Activity size={22} className="text-navy-700" />
              <h3 className="mt-2.5 text-sm font-bold text-navy-950">Live Activity</h3>
              <p className="mt-1 text-xs text-slate-500">
                Website is actively receiving enquiries.
              </p>
            </div>

            <div className="rounded-xl border border-navy-950/5 bg-navy-50/60 p-4">
              <Server size={22} className="text-navy-700" />
              <h3 className="mt-2.5 text-sm font-bold text-navy-950">Server Health</h3>
              <p className="mt-1 text-xs text-slate-500">
                Backend services are operating normally.
              </p>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          {...fadeUp(0.12)}
          className="rounded-xl border border-navy-950/5 bg-white p-5 shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
        >
          <h2 className="text-lg font-extrabold text-navy-950">System Status</h2>

          <div className="mt-3.5 space-y-3">
            {[
              { label: "Website", value: "Running", tone: "positive" },
              { label: "Backend", value: "Online", tone: "positive" },
              { label: "Database", value: "Connected", tone: "info" },
              { label: "Admin Version", value: "v2.0", tone: "plain" },
              { label: "Last Updated", value: new Date().toLocaleDateString(), tone: "plain" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{row.label}</span>

                {row.tone === "plain" ? (
                  <span className="text-xs font-bold text-navy-950">{row.value}</span>
                ) : (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      row.tone === "positive"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="relative mt-5 overflow-hidden rounded-xl bg-navy-950 p-4 text-white">
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold-500/20 blur-2xl" />
            <TrendingUp size={18} className="relative text-gold-400" />
            <h3 className="relative mt-2.5 text-sm font-bold">Business Insights</h3>
            <p className="relative mt-1.5 text-xs leading-5 text-white/60">
              Keep monitoring customer enquiries and proposal requests to
              identify new business opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;