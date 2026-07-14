import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, BrainCircuit, Cable, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Container from "./ui/Container";

const interactionsOverTime = [
  { v: 40 }, { v: 55 }, { v: 48 }, { v: 62 }, { v: 58 },
  { v: 70 }, { v: 66 }, { v: 78 }, { v: 74 }, { v: 85 }, { v: 80 }, { v: 92 },
];

const channelDistribution = [
  { name: "Voice", value: 60, color: "#D4AF37" },
  { name: "Chat", value: 20, color: "#123F94" },
  { name: "Email", value: 15, color: "#4C7CE0" },
  { name: "Social", value: 5, color: "#8FA9DC" },
];

const sentiment = [
  { label: "Positive", value: 85, color: "bg-emerald-400" },
  { label: "Neutral", value: 10, color: "bg-gold-400" },
  { label: "Negative", value: 5, color: "bg-rose-400" },
];

const features = [
  { icon: Activity, label: "Real-time Monitoring" },
  { icon: ShieldCheck, label: "Quality Assurance" },
  { icon: BrainCircuit, label: "AI Sentiment Analysis" },
  { icon: Cable, label: "CRM & Tools Integration" },
];

function TechPlatform() {
  return (
    <section
      id="technology"
      className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-700/25 blur-[130px]" />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Technology That Powers Every Interaction
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Our Intelligent CX Platform
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
              Real-time dashboards, AI-driven insight and robust integrations
              give you complete visibility and control over every customer
              interaction — no black boxes, no guesswork.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/[0.06] text-gold-400">
                    <feature.icon size={17} />
                  </span>
                  <span className="text-sm font-medium text-white/80">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Explore Platform
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Right dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold-500/15 via-navy-600/20 to-transparent blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Dashboard</span>
              <div className="flex -space-x-2">
                {["bg-navy-600", "bg-gold-500"].map((tone, i) => (
                  <span
                    key={i}
                    className={`h-6 w-6 rounded-full border-2 border-navy-950 ${tone}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Total Interactions", value: "18,650", delta: "+13.6%" },
                { label: "Connected Calls", value: "12,430", delta: "+8.3%" },
                { label: "Avg. Handling Time", value: "03:42", delta: "-5.4%" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/[0.05] p-3">
                  <p className="text-[10px] text-white/45">{stat.label}</p>
                  <p className="mt-1 text-sm font-bold text-white">{stat.value}</p>
                  <p
                    className={`text-[10px] font-medium ${
                      stat.delta.startsWith("-") ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {stat.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-white/[0.05] p-3">
              <p className="text-[10px] text-white/45">Interactions Over Time</p>
              <div className="mt-1 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={interactionsOverTime}>
                    <Line type="monotone" dataKey="v" stroke="#D4AF37" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-[10px] text-white/45">Channel Distribution</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="h-16 w-16 flex-none">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelDistribution}
                          dataKey="value"
                          innerRadius={20}
                          outerRadius={30}
                          stroke="none"
                        >
                          {channelDistribution.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1">
                    {channelDistribution.map((c) => (
                      <div key={c.name} className="flex items-center gap-1.5 text-[9px] text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name} {c.value}%
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.05] p-3">
                <p className="text-[10px] text-white/45">Sentiment Overview</p>
                <div className="mt-3 space-y-2">
                  {sentiment.map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-[9px] text-white/60">
                        <span>{s.label}</span>
                        <span>{s.value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                        <div
                          className={`h-1.5 rounded-full ${s.color}`}
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -top-6 hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-xl sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                <BrainCircuit size={15} />
              </span>
              <div>
                <p className="text-[10px] text-slate-400">Powered by</p>
                <p className="text-xs font-bold text-navy-950">AI Analytics</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default TechPlatform;
