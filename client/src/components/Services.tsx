import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Headphones,
  Users2,
  TrendingUp,
  MonitorSmartphone,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

import Container from "./ui/Container";

const solutions = [
  {
    icon: Headphones,
    title: "Customer Experience",
    description:
      "Deliver delightful support across voice, email, chat and social channels — every conversation on-brand and on-time.",
  },
  {
    icon: Users2,
    title: "Sales & Lead Management",
    description:
      "Generate qualified pipeline, nurture prospects and convert more of them with structured, data-led outreach.",
  },
  {
    icon: TrendingUp,
    title: "Business Operations",
    description:
      "Streamline back-office processes, cut operating costs and lift efficiency across every workflow that touches the customer.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Engagement",
    description:
      "Reach your audience on the channels they actually use, with messaging tuned to context and intent.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Analytics",
    description:
      "Turn every interaction into insight — sentiment, quality and performance signals that make the next decision easier.",
  },
];

function Services() {
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
            Our Solutions
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Enterprise Solutions That Drive Results
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_16px_-6px_rgba(11,46,109,0.08)] transition-all duration-300 hover:border-gold-500/40 hover:shadow-[0_20px_38px_-14px_rgba(11,46,109,0.2)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                <item.icon size={24} />
              </span>

              <h3 className="mt-6 text-lg font-bold text-navy-950">{item.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600"
              >
                Learn More
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;
