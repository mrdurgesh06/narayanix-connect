import { motion } from "framer-motion";
import { MessageSquare, ShieldCheck, Clock3, Building2 } from "lucide-react";

import Container from "./ui/Container";
import Counter from "./ui/Counter";

const stats = [
  { icon: MessageSquare, value: 10000, suffix: "+", label: "Interactions Handled" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Quality Score" },
  { icon: Clock3, value: 24, suffix: "×7", label: "Availability" },
  { icon: Building2, value: 50, suffix: "+", label: "Industries Served" },
];

function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gold-500/15 blur-[130px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-navy-600/30 blur-[130px]"
      />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-xl backdrop-blur-xl sm:p-8"
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] text-gold-400"
              >
                <stat.icon size={20} />
              </motion.span>

              <p className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} duration={2.4} />
              </p>

              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Stats;
