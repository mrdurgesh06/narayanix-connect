import { motion } from "framer-motion";

import {
  Building2,
  Target,
  Eye,
  CheckCircle2,
  Users2,
  Clock3,
  ShieldCheck,
  Layers,
} from "lucide-react";

import Container from "../components/ui/Container";
import Counter from "../components/ui/Counter";
import CTA from "../components/CTA";

const highlights = [
  "Platform-Led Delivery",
  "Experienced, Industry-Trained Teams",
  "Customer-First Approach",
];

const coreValues = [
  {
    title: "Integrity",
    description: "Honest and transparent business practices.",
  },
  {
    title: "Excellence",
    description: "Consistently delivering quality outcomes.",
  },
  {
    title: "Innovation",
    description: "Continuously improving our platform and process.",
  },
  {
    title: "Customer First",
    description: "Building long-term client relationships.",
  },
];

const stats = [
  { icon: Users2, value: 500, suffix: "+", label: "Businesses Partnered" },
  { icon: Clock3, value: 24, suffix: "×7", label: "Platform Support" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Client Satisfaction" },
  { icon: Layers, value: 10, suffix: "+", label: "Industries Served" },
];

function About() {
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
              <Building2 size={14} className="text-gold-400" />
              About Narayanix Connect
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Building Reliable
              <br />
              Business <span className="text-gradient-gold">Partnerships.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
            >
              Narayanix Connect delivers technology-enabled customer
              experience, sales enablement and business operations for
              growing enterprises — built on one real-time platform, not a
              call floor running scripts.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Who we are + Mission/Vision/Values */}
      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
                Who We Are
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                A Technology Partner, Not A Vendor
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-500">
                We specialize in customer experience, sales enablement,
                business operations, digital engagement and AI-driven
                analytics for growing businesses across multiple industries.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-500">
                Our goal is to be a long-term technology partner — delivering
                reliable, scalable and customer-focused programs that help
                organizations grow efficiently, backed by real-time
                visibility into every interaction.
              </p>

              <div className="mt-9 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="flex-none text-gold-500" />
                    <span className="text-navy-950/75">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[32px] border border-navy-950/5 bg-white p-8 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] sm:p-10"
            >
              <div className="space-y-6">
                {/* Mission */}
                <div className="rounded-2xl border border-navy-950/5 p-7 transition-colors duration-300 hover:border-gold-400/40">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                      <Target size={22} />
                    </span>
                    <h3 className="text-xl font-bold text-navy-950">Our Mission</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    To give growing businesses an affordable, technology-led
                    way to deliver exceptional customer experience —
                    improving efficiency and satisfaction without the
                    overhead of building it in-house.
                  </p>
                </div>

                {/* Vision */}
                <div className="rounded-2xl border border-navy-950/5 p-7 transition-colors duration-300 hover:border-gold-400/40">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                      <Eye size={22} />
                    </span>
                    <h3 className="text-xl font-bold text-navy-950">Our Vision</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    To become one of India's most trusted technology-enabled
                    partners for customer experience and business
                    operations — known for a platform clients can see into,
                    not a black box they have to trust blindly.
                  </p>
                </div>

                {/* Core values */}
                <div className="rounded-2xl bg-navy-950 p-7">
                  <h3 className="text-xl font-bold text-white">Our Core Values</h3>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {coreValues.map((value) => (
                      <div key={value.title} className="rounded-xl bg-white/[0.06] p-4">
                        <h4 className="text-sm font-semibold text-gold-400">{value.title}</h4>
                        <p className="mt-2 text-sm leading-5 text-white/55">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-white py-20 lg:py-24">
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

export default About;