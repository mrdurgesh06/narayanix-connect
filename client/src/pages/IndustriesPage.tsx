import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  ShoppingCart,
  Banknote,
  Building2,
  GraduationCap,
  Laptop2,
  Plane,
  Car,
  Users2,
  ShieldCheck,
  Layers,
  Workflow,
  Clock3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import Container from "../components/ui/Container";
import Counter from "../components/ui/Counter";
import CTA from "../components/CTA";

const industries = [
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    description:
      "Admissions, student services and academic support handled with the empathy and responsiveness education demands.",
    capabilities: [
      "Admissions & enrollment support",
      "Student helpdesk across channels",
      "Academic-calendar-aware scheduling",
    ],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Patient-first support built around appointment accuracy, privacy and round-the-clock availability.",
    capabilities: [
      "Appointment scheduling & reminders",
      "Privacy-first data handling",
      "Patient helpdesk & triage support",
    ],
  },
  {
    id: "bfsi",
    icon: Banknote,
    title: "BFSI",
    description:
      "Secure, compliant support for banking, financial services and insurance — where trust is the product.",
    capabilities: [
      "Compliance-first processes",
      "Fraud & dispute handling support",
      "Secure document processing",
    ],
  },
  {
    id: "real-estate",
    icon: Building2,
    title: "Real Estate",
    description:
      "Lead response speed and follow-through that turns inquiries into site visits and closings.",
    capabilities: [
      "Lead qualification & scoring",
      "Site-visit scheduling",
      "CRM-synced follow-up",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Order, returns and live support tuned to peak-season volume without breaking response times.",
    capabilities: [
      "Order tracking & returns support",
      "Live chat & cart recovery",
      "Marketplace & channel integration",
    ],
  },
  {
    id: "travel-hospitality",
    icon: Plane,
    title: "Travel & Hospitality",
    description:
      "Booking, itinerary changes and guest care handled with the responsiveness travel demands.",
    capabilities: [
      "Reservation & booking support",
      "Itinerary changes & cancellations",
      "24×7 guest care",
    ],
  },
  {
    id: "automotive",
    icon: Car,
    title: "Automotive",
    description:
      "Service scheduling, dealership support and customer follow-through across the ownership lifecycle.",
    capabilities: [
      "Service appointment scheduling",
      "Dealership & showroom support",
      "Post-sale customer follow-up",
    ],
  },
  {
    id: "it-software",
    icon: Laptop2,
    title: "IT & Software",
    description:
      "Technical helpdesk and customer success support for software and technology businesses.",
    capabilities: [
      "Tiered technical helpdesk",
      "Remote issue resolution",
      "Customer success & onboarding",
    ],
  },
];

const whyCards = [
  {
    icon: Workflow,
    title: "Industry Playbooks, Not Guesswork",
    description:
      "Sector-specific workflows refined across dozens of live programs, adapted to how your business actually runs.",
    span: "lg:col-span-2",
    dark: true,
  },
  {
    icon: Users2,
    title: "Industry Specialists",
    description: "Teams trained on your sector's terms, tools and customers, not generic scripts.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description: "Data handling shaped around the regulatory reality of your industry.",
  },
  {
    icon: Layers,
    title: "Flexible By Season",
    description: "Scale for enrollment season, holiday peaks or launch spikes without re-hiring from scratch.",
  },
];

const stats = [
  { icon: Layers, value: 10, suffix: "+", label: "Industries Served" },
  { icon: Users2, value: 500, suffix: "+", label: "Business Clients" },
  { icon: Clock3, value: 24, suffix: "×7", label: "Customer Support" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Client Satisfaction" },
];

function IndustriesPage() {
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
              Industries We Serve
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Support Built Around Your
              <br />
              Industry, <span className="text-gradient-gold">Not A Template.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
            >
              Every sector has its own rhythm, compliance needs and customer
              expectations. Our programs are shaped around yours — powered by
              the same real-time platform across every industry we serve.
            </motion.p>
          </div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {industries.map((ind) => (
              <a
                key={ind.id}
                href={`#${ind.id}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-300 hover:border-gold-400/40 hover:text-white"
              >
                <ind.icon size={15} className="text-gold-400" />
                {ind.title}
              </a>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Industries grid */}
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
              Where We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Experience Across Eight Industries
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-500">
              The platform stays the same underneath. What changes is the
              workflow, compliance and tone built around each industry.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.id}
                id={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -6 }}
                className="group scroll-mt-28 flex flex-col rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_32px_-12px_rgba(11,46,109,0.16)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                  <industry.icon size={22} />
                </span>

                <h3 className="mt-6 text-lg font-bold text-navy-950">
                  {industry.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {industry.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-navy-950/5 pt-5">
                  {industry.capabilities.map((capability) => (
                    <div key={capability} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 flex-none text-gold-500" />
                      <span className="text-sm text-navy-950/70">{capability}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/proposal"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600"
                >
                  Explore this fit
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why industries choose us */}
      <section className="bg-white py-24 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
              Why Industries Choose Narayanix
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Built By Industry, Not By Template
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={`${card.span ?? ""} ${
                  card.dark ? "bg-navy-950 text-white" : "bg-navy-50/60 text-navy-950"
                } flex flex-col justify-between rounded-2xl p-7`}
              >
                <div>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      card.dark ? "bg-white/10 text-gold-400" : "bg-white text-navy-700"
                    }`}
                  >
                    <card.icon size={20} />
                  </span>

                  <h3 className="mt-5 text-lg font-bold">{card.title}</h3>

                  <p className={`mt-2 text-sm leading-6 ${card.dark ? "text-white/60" : "text-slate-500"}`}>
                    {card.description}
                  </p>
                </div>
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

export default IndustriesPage;