import { motion } from "framer-motion";
import {
  Smile,
  Zap,
  PiggyBank,
  TrendingUp,
  Repeat,
  BarChart3,
} from "lucide-react";

import Container from "./ui/Container";

const outcomes = [
  {
    icon: Smile,
    title: "Increase Customer Satisfaction",
    description: "Consistent, on-brand service that turns support into a reason customers stay.",
  },
  {
    icon: Zap,
    title: "Improve Response Time",
    description: "Faster first-response and resolution times across every channel you support.",
  },
  {
    icon: PiggyBank,
    title: "Reduce Operational Cost",
    description: "Lower cost-to-serve without compromising quality, through smarter workflows.",
  },
  {
    icon: TrendingUp,
    title: "Increase Lead Conversion",
    description: "Structured follow-up and qualification that turns more leads into revenue.",
  },
  {
    icon: Repeat,
    title: "Better Customer Retention",
    description: "Proactive engagement that catches churn signals before customers walk away.",
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    description: "Clear, real-time reporting that turns every interaction into a decision you can act on.",
  },
];

function BusinessOutcomes() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
            Business Outcomes
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Results You Can Measure
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-2xl border border-navy-950/5 bg-navy-50/50 p-6 transition-shadow duration-300 hover:shadow-[0_16px_32px_-14px_rgba(11,46,109,0.18)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
                <outcome.icon size={22} />
              </span>

              <h3 className="mt-5 text-base font-bold text-navy-950">{outcome.title}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BusinessOutcomes;
