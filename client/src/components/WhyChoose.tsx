import { motion } from "framer-motion";
import {
  Cpu,
  Users2,
  Workflow,
  ShieldCheck,
  Layers,
  Lock,
} from "lucide-react";

import Container from "./ui/Container";

const cards = [
  {
    icon: Cpu,
    title: "Technology First",
    description:
      "Every program runs on our CX platform from day one — live dashboards, CRM sync and AI insight built in, not bolted on.",
    span: "lg:col-span-2",
    dark: true,
  },
  {
    icon: Users2,
    title: "Experienced Team",
    description: "Trained specialists who understand your industry, not generic scripts.",
  },
  {
    icon: Workflow,
    title: "Flexible Operations",
    description: "Programs that flex with your seasonality and growth, not the other way around.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Monitoring",
    description: "Every interaction scored against your standards, continuously.",
  },
  {
    icon: Layers,
    title: "Scalable Teams",
    description: "Add capacity in days, not quarters, as your business grows.",
  },
  {
    icon: Lock,
    title: "Secure Processes",
    description: "Enterprise-grade data handling and access controls by default.",
  },
];

function WhyChoose() {
  return (
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
            Why Narayanix Connect
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Built for Businesses That Take CX Seriously
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden ${card.span ?? ""} ${
                card.dark
                  ? "bg-navy-950 text-white shadow-[0_24px_50px_-20px_rgba(7,20,46,0.55)]"
                  : "bg-navy-50/60 text-navy-950 shadow-[0_4px_20px_-10px_rgba(11,46,109,0.1)]"
              } flex flex-col justify-between rounded-2xl p-8 transition-shadow duration-300 hover:shadow-[0_28px_54px_-18px_rgba(11,46,109,0.28)]`}
            >
              {card.dark && (
                <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-gold-500/15 blur-[80px]" />
              )}

              <div className="relative">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    card.dark ? "bg-white/10 text-gold-400" : "bg-white text-navy-700 shadow-sm"
                  }`}
                >
                  <card.icon size={22} />
                </span>

                <h3 className="mt-6 text-xl font-bold">{card.title}</h3>

                <p
                  className={`mt-2.5 text-sm leading-6 ${
                    card.dark ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyChoose;
