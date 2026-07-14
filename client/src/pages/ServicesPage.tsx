import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Headphones,
  Target,
  Workflow,
  MonitorSmartphone,
  BrainCircuit,
  Activity,
  ShieldCheck,
  Cable,
  Lock,
  MessageSquare,
  Clock3,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import Container from "../components/ui/Container";
import Counter from "../components/ui/Counter";
import CTA from "../components/CTA";

const solutions = [
  {
    id: "customer-experience",
    icon: Headphones,
    title: "Customer Experience",
    description:
      "Support across voice, chat, email and social — routed to the right person, on-brand and on-time, every time.",
    capabilities: [
      "Unified omnichannel queue",
      "Real-time coaching & QA scoring",
      "CSAT and sentiment on every conversation",
    ],
  },
  {
    id: "sales-lead-management",
    icon: Target,
    title: "Sales & Lead Management",
    description:
      "Structured, data-led outreach that builds pipeline and converts more of it — not a dialer running down a list.",
    capabilities: [
      "Lead scoring & qualification",
      "Appointment setting with calendar sync",
      "Native handoff into your CRM",
    ],
  },
  {
    id: "business-operations",
    icon: Workflow,
    title: "Business Operations",
    description:
      "Back-office workflows redesigned around your SLAs, with automation handling the repeatable parts.",
    capabilities: [
      "Process design & documentation",
      "Workflow automation",
      "Cost-to-serve tracked against SLA",
    ],
  },
  {
    id: "digital-engagement",
    icon: MonitorSmartphone,
    title: "Digital Engagement",
    description:
      "Meet customers on the channels they already use, with messaging tuned to context and intent.",
    capabilities: [
      "WhatsApp, chat & social messaging",
      "Bot-assisted triage with human handoff",
      "Always-on, cross-channel availability",
    ],
  },
  {
    id: "ai-analytics",
    icon: BrainCircuit,
    title: "AI & Analytics",
    description:
      "Every interaction becomes a data point — sentiment, quality and performance signals that inform the next decision.",
    capabilities: [
      "Real-time performance dashboards",
      "Sentiment & intent detection",
      "Trend analysis & coaching insights",
    ],
  },
];

const platformFeatures = [
  {
    icon: Activity,
    title: "Real-Time Dashboards",
    description: "Live volumes, handling time and outcomes, visible the moment they happen.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous Quality Scoring",
    description: "Every interaction measured against your standards, not sampled at random.",
  },
  {
    icon: BrainCircuit,
    title: "AI Sentiment & Intent",
    description: "Understand not just what was said, but how the customer felt about it.",
  },
  {
    icon: Cable,
    title: "CRM & Tool Integration",
    description: "Plugs into the systems you already run — no rip and replace.",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description: "Routine steps handled by the platform, so specialists focus on judgment calls.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    description: "Role-based access and audited data handling by default.",
  },
];

const stats = [
  { icon: MessageSquare, value: 10000, suffix: "+", label: "Interactions Handled Monthly" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Average Quality Score" },
  { icon: Clock3, value: 24, suffix: "×7", label: "Platform Uptime & Support" },
  { icon: Building2, value: 50, suffix: "+", label: "Programs Live Across Industries" },
];

function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-14 pb-24 lg:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-navy-600/30 blur-[110px]" />
        <div className="pointer-events-none absolute top-24 right-[6%] h-[380px] w-[380px] rounded-full bg-gold-500/10 blur-[110px]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              <Sparkles size={13} className="text-gold-400" />
              Our Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Solutions Designed Around
              <br />
              Outcomes,{" "}
              <span className="text-gradient-gold">Not Headcount.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
            >
              From customer experience to AI-driven analytics, every Narayanix
              Connect solution runs on the same real-time platform — live
              dashboards, structured workflows and specialists who know your
              industry, not a call floor reading from a script.
            </motion.p>
          </div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {solutions.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-300 hover:border-gold-400/40 hover:text-white"
              >
                <s.icon size={15} className="text-gold-400" />
                {s.title}
              </a>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Solutions grid */}
      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
              What We Deliver
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Five Solutions. One Platform.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-500">
              Every engagement draws on the same underlying platform, so
              capabilities work together instead of living in separate
              systems.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.id}
                id={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group scroll-mt-28 flex flex-col rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_32px_-12px_rgba(11,46,109,0.16)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                  <solution.icon size={22} />
                </span>

                <h3 className="mt-6 text-xl font-bold text-navy-950">
                  {solution.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {solution.description}
                </p>

                <div className="mt-6 space-y-2.5 border-t border-navy-950/5 pt-6">
                  {solution.capabilities.map((capability) => (
                    <div key={capability} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 flex-none text-gold-500" />
                      <span className="text-sm text-navy-950/70">{capability}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/proposal"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600"
                >
                  Talk about this solution
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Platform */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-700/25 blur-[130px]" />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              The Platform Underneath
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              One Platform Powers Every Solution
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60">
              No separate systems, no swivel-chair reporting. Every program
              plugs into the same real-time platform — so you always know
              what's happening, as it happens.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-gold-400">
                  <feature.icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-navy-950/5 bg-white p-7 text-center shadow-[0_2px_16px_-8px_rgba(11,46,109,0.08)]"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <stat.icon size={18} />
                </span>
                <p className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} duration={2.2} />
                </p>
                <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTA />
    </>
  );
}

export default ServicesPage;