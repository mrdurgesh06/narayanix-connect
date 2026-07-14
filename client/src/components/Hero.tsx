import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Headphones,
  Users2,
  Target,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import Container from "./ui/Container";
import Counter from "./ui/Counter";

const sparkline = [
  { v: 30 }, { v: 42 }, { v: 38 }, { v: 55 }, { v: 48 },
  { v: 62 }, { v: 58 }, { v: 70 }, { v: 66 }, { v: 80 },
];

const pills = [
  { icon: Headphones, label: "Customer Experience" },
  { icon: Users2, label: "Business Operations" },
  { icon: Target, label: "Lead Management" },
  { icon: BrainCircuit, label: "AI Ready" },
];

const float = (delay = 0) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay } as const,
});

function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 pt-20 pb-32 lg:pt-24 lg:pb-48"
      style={{
        backgroundImage:
          'linear-gradient(rgba(6,15,35,.88), rgba(6,15,35,.76)), url("./hero/hero-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 bg-noise mix-blend-overlay opacity-30" />

      <div className="pointer-events-none absolute -top-32 left-[8%] h-[460px] w-[460px] rounded-full bg-navy-600/35 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-[6%] h-[420px] w-[420px] rounded-full bg-gold-500/12 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-500/10 blur-[160px]" />

      {/* Abstract lotus line art */}
      <svg
        className="pointer-events-none absolute -right-24 top-10 h-[560px] w-[560px] opacity-[0.12] lg:opacity-20"
        viewBox="0 0 400 400"
        fill="none"
      >
        <g stroke="url(#lotusStroke)" strokeWidth="1.2">
          <path d="M200 60 C170 130 170 200 200 260 C230 200 230 130 200 60Z" />
          <path d="M110 130 C150 170 180 210 200 260 C170 240 120 220 90 190 C70 165 80 145 110 130Z" />
          <path d="M290 130 C250 170 220 210 200 260 C230 240 280 220 310 190 C330 165 320 145 290 130Z" />
          <path d="M60 220 C120 230 165 245 200 270 C155 265 100 270 65 285 C40 260 40 235 60 220Z" />
          <path d="M340 220 C280 230 235 245 200 270 C245 265 300 270 335 285 C360 260 360 235 340 220Z" />
          <circle cx="200" cy="120" r="8" />
          <circle cx="200" cy="165" r="6" />
          <circle cx="175" cy="185" r="6" />
          <circle cx="225" cy="185" r="6" />
          <line x1="200" y1="128" x2="200" y2="255" />
          <line x1="175" y1="191" x2="175" y2="240" />
          <line x1="225" y1="191" x2="225" y2="240" />
        </g>
        <defs>
          <linearGradient id="lotusStroke" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#123F94" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left column */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              <Sparkles size={13} className="text-gold-400" />
              Customer Experience. Business Growth.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.4rem]"
            >
              Exceptional
              <br />
              Experiences.
              <br />
              Stronger Relationships.
              <br />
              <span className="text-gradient-gold">Smarter Business.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-lg leading-8 text-white/60"
            >
              Narayanix Connect delivers technology-enabled customer support and
              business process solutions that help you acquire, engage and
              retain more customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap gap-3"
            >
              {pills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75"
                >
                  <pill.icon size={15} className="text-gold-400" />
                  {pill.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/proposal"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-8px_rgba(212,175,55,0.75)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative">Book Free Demo</span>
                <ArrowRight size={17} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                <Play size={16} className="fill-white" />
                Explore Solutions
              </Link>
            </motion.div>
          </div>

          {/* Right column — floating dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[620px] lg:mx-0"
          >
            {/* Main Live Overview card */}
            <motion.div
              {...float(0)}
              className="relative z-10 rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Live Overview</span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Today
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] text-white/45">Total Interactions</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    <Counter value={18650} duration={2.2} />
                  </p>
                  <p className="text-[11px] font-medium text-emerald-400">+12.4%</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/45">Connected Calls</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    <Counter value={12430} duration={2.2} />
                  </p>
                  <p className="text-[11px] font-medium text-emerald-400">+8.2%</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/45">Happy Customers</p>
                  <p className="mt-1 text-xl font-bold text-white">98.6%</p>
                  <p className="text-[11px] font-medium text-emerald-400">+2.4%</p>
                </div>
              </div>

              <div className="mt-5 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkline}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#D4AF37"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;