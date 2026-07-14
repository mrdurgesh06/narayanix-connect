import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Users,
  FileText,
  Activity,
  Server,
  TrendingUp,
  UserPlus,
  ArrowRight,
  CheckCircle2,
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

function Dashboard() {

  const [data, setData] =
    useState<DashboardData>({
      totalContacts: 0,
      totalProposals: 0,
      latestContacts: [],
      latestProposals: [],
    });

  const [loading, setLoading] =
    useState(true);
const chartData = [
  {
    name: "Contacts",
    value: data.totalContacts,
  },
  {
    name: "Proposals",
    value: data.totalProposals,
  },
  {
    name: "Leads",
    value:
      data.totalContacts +
      data.totalProposals,
  },
];

  const loadDashboard = async () => {

    try {

      const res =
        await api.get("/admin/dashboard");

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

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <h2 className="mt-8 text-3xl font-bold text-slate-800">

            Loading Dashboard...

          </h2>

          <p className="mt-3 text-slate-500">

            Fetching latest business data...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-10">

      {/* Premium Header */}

      <div className="overflow-hidden rounded-[34px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

        <div className="rounded-[33px] bg-white p-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">

                <CheckCircle2 size={18} />

                NARAYANIX Admin Dashboard

              </div>

              <h1 className="mt-6 text-5xl font-black text-slate-900">

                Welcome Back,
                <span className="text-blue-600">

                  {" "}Administrator

                </span>

              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">

                Monitor enquiries, proposal requests and system
                performance from one centralized dashboard.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-slate-50 p-6 text-center">

                <Clock3
                  size={32}
                  className="mx-auto text-blue-600"
                />

                <h3 className="mt-3 text-3xl font-black text-slate-900">

                  24×7

                </h3>

                <p className="mt-2 text-slate-500">

                  Monitoring

                </p>

              </div>

              <div className="rounded-3xl bg-slate-50 p-6 text-center">

                <TrendingUp
                  size={32}
                  className="mx-auto text-green-600"
                />

                <h3 className="mt-3 text-3xl font-black text-slate-900">

                  Live

                </h3>

                <p className="mt-2 text-slate-500">

                  Business Data

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {/* Total Contacts */}

        <div className="group rounded-[30px] border border-blue-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Total Contacts

              </p>

              <h2 className="mt-5 text-5xl font-black text-blue-600">

                {data.totalContacts}

              </h2>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">

                <TrendingUp size={16} />

                <span className="font-semibold">

                  Active Leads

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">

              <Users
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Total Proposals */}

        <div className="group rounded-[30px] border border-green-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Total Proposals

              </p>

              <h2 className="mt-5 text-5xl font-black text-green-600">

                {data.totalProposals}

              </h2>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-600">

                <Briefcase size={16} />

                <span className="font-semibold">

                  Business Requests

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl">

              <FileText
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Active Leads */}

        <div className="group rounded-[30px] border border-purple-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Active Leads

              </p>

              <h2 className="mt-5 text-5xl font-black text-purple-600">

                {data.totalContacts + data.totalProposals}

              </h2>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-600">

                <UserPlus size={16} />

                <span className="font-semibold">

                  Potential Clients

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl">

              <UserPlus
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Server Status */}

        <div className="group rounded-[30px] border border-emerald-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Server Status

              </p>

              <h2 className="mt-5 text-4xl font-black text-emerald-600">

                Online

              </h2>

              <div className="mt-5 flex items-center gap-3">

                <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></span>

                <span className="font-semibold text-emerald-600">

                  Running Smoothly

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl">

              <Server
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Website Activity */}

        <div className="group rounded-[30px] border border-orange-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Website Activity

              </p>

              <h2 className="mt-5 text-4xl font-black text-orange-500">

                Active

              </h2>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-orange-600">

                <Activity size={16} />

                <span className="font-semibold">

                  Receiving Requests

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 shadow-xl">

              <Activity
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* Growth */}

        <div className="group rounded-[30px] border border-cyan-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-slate-500 font-medium">

                Business Growth

              </p>

              <h2 className="mt-5 text-5xl font-black text-cyan-600">

                +24%

              </h2>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-cyan-600">

                <TrendingUp size={16} />

                <span className="font-semibold">

                  This Month

                </span>

              </div>

            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl">

              <TrendingUp
                size={38}
                className="text-white"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Recent Activity */}
            <div className="grid gap-8 xl:grid-cols-2">

        {/* Recent Contacts */}

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-black text-slate-900">

                Recent Contacts

              </h2>

              <p className="mt-2 text-slate-500">

                Latest customer enquiries

              </p>

            </div>

            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >

              View All

              <ArrowRight size={18} />

            </Link>

          </div>

          {data.latestContacts.length === 0 ? (

            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">

              <Users
                size={50}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-700">

                No Contacts Yet

              </h3>

              <p className="mt-2 text-slate-500">

                New enquiries will appear here.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {data.latestContacts.map((contact) => (

                <div
                  key={contact.id}
                  className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-xl font-bold text-slate-900">

                        {contact.name}

                      </h3>

                      <p className="mt-1 text-slate-500">

                        {contact.company || "No Company"}

                      </p>

                      <p className="mt-2 text-blue-600">

                        {contact.email}

                      </p>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white">

                      {contact.name.charAt(0)}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Recent Proposals */}

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-black text-slate-900">

                Recent Proposals

              </h2>

              <p className="mt-2 text-slate-500">

                Latest proposal requests

              </p>

            </div>

            <Link
              to="/admin/proposals"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >

              View All

              <ArrowRight size={18} />

            </Link>

          </div>

          {data.latestProposals.length === 0 ? (

            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">

              <FileText
                size={50}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-700">

                No Proposals Yet

              </h3>

              <p className="mt-2 text-slate-500">

                Proposal requests will appear here.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {data.latestProposals.map((proposal) => (

                <div
                  key={proposal.id}
                  className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-green-200 hover:bg-green-50"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-xl font-bold text-slate-900">

                        {proposal.company}

                      </h3>

                      <p className="mt-1 text-slate-500">

                        {proposal.name}

                      </p>

                      <span className="mt-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                        {proposal.service}

                      </span>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-xl font-bold text-white">

                      {proposal.company.charAt(0)}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

{/* Dashboard Charts */}

<div className="grid gap-8 xl:grid-cols-2">

  {/* Contacts Chart */}

  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

    <h2 className="text-3xl font-black text-slate-900 mb-8">

      Contacts Overview

    </h2>

    <div className="h-80">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* Leads Chart */}

  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

    <h2 className="text-3xl font-black text-slate-900 mb-8">

      Business Overview

    </h2>

    <div className="h-80">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

      {/* Quick Actions */}
            <div className="grid gap-8 xl:grid-cols-3">

        {/* Quick Actions */}

        <div className="xl:col-span-2 rounded-[32px] bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-[1px] shadow-2xl">

          <div className="rounded-[31px] bg-white p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black text-slate-900">

                  Quick Actions

                </h2>

                <p className="mt-2 text-slate-500">

                  Frequently used admin shortcuts.

                </p>

              </div>

            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <Link
                to="/admin/contacts"
                className="group rounded-3xl border border-blue-100 bg-blue-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-blue-600 hover:text-white"
              >

                <Users
                  size={38}
                  className="text-blue-600 group-hover:text-white"
                />

                <h3 className="mt-5 text-2xl font-bold">

                  Manage Contacts

                </h3>

                <p className="mt-2 text-slate-600 group-hover:text-blue-100">

                  View, search and manage all customer enquiries.

                </p>

              </Link>

              <Link
                to="/admin/proposals"
                className="group rounded-3xl border border-green-100 bg-green-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-green-600 hover:text-white"
              >

                <FileText
                  size={38}
                  className="text-green-600 group-hover:text-white"
                />

                <h3 className="mt-5 text-2xl font-bold">

                  Manage Proposals

                </h3>

                <p className="mt-2 text-slate-600 group-hover:text-green-100">

                  Review and respond to proposal requests.

                </p>

              </Link>

              <div className="group rounded-3xl border border-orange-100 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-2">

                <Activity
                  size={38}
                  className="text-orange-500"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-900">

                  Live Activity

                </h3>

                <p className="mt-2 text-slate-600">

                  Website is actively receiving enquiries.

                </p>

              </div>

              <div className="group rounded-3xl border border-emerald-100 bg-emerald-50 p-6 transition-all duration-300 hover:-translate-y-2">

                <Server
                  size={38}
                  className="text-emerald-600"
                />

                <h3 className="mt-5 text-2xl font-bold text-slate-900">

                  Server Health

                </h3>

                <p className="mt-2 text-slate-600">

                  Backend services are operating normally.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* System Information */}

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-black text-slate-900">

            System Status

          </h2>

          <div className="mt-8 space-y-6">

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Website

              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                Running

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Backend

              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                Online

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Database

              </span>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                Connected

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Admin Version

              </span>

              <span className="font-bold text-slate-900">

                v2.0

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Last Updated

              </span>

              <span className="font-semibold text-slate-900">

                {new Date().toLocaleDateString()}

              </span>

            </div>

          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

            <TrendingUp size={34} />

            <h3 className="mt-5 text-2xl font-bold">

              Business Insights

            </h3>

            <p className="mt-3 text-blue-100 leading-7">

              Keep monitoring customer enquiries and proposal requests
              to identify new business opportunities.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;