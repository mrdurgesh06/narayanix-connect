import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Banknote,
  Building2,
  ShoppingCart,
  Plane,
  Car,
  LayoutGrid,
} from "lucide-react";

import Container from "./ui/Container";

const industries = [
  { icon: GraduationCap, label: "Education" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Banknote, label: "BFSI" },
  { icon: Building2, label: "Real Estate" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Plane, label: "Travel & Hospitality" },
  { icon: Car, label: "Automotive" },
  { icon: LayoutGrid, label: "And Many More" },
];

function Industries() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
            Industries We Empower
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Experience. Expertise. Across Industries.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {industries.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-navy-950/5 bg-white py-10 text-center shadow-[0_2px_16px_-8px_rgba(11,46,109,0.08)] transition-shadow duration-300 hover:border-gold-500/30 hover:shadow-[0_20px_36px_-16px_rgba(11,46,109,0.22)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800">
                <item.icon size={28} />
              </span>
              <span className="px-3 text-sm font-semibold text-navy-950">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Industries;
