import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

import Container from "./ui/Container";

function CTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-gold-500/25 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="pointer-events-none absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-navy-500/30 blur-[120px]"
      />

      <Container className="relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Ready to Elevate Your Customer Experience?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-lg text-white/60"
        >
          Tell us about your goals and we'll design a program built around them —
          no generic scripts, no one-size-fits-all pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/proposal"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-500 px-8 py-4 font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_rgba(212,175,55,0.8)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
            <Calendar size={17} className="relative" />
            <span className="relative">Book Demo</span>
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
          >
            Talk to Experts
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTA;
