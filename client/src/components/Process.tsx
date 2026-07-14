import { motion } from "framer-motion";
import { Search, Compass, UserPlus, Rocket, LineChart } from "lucide-react";

import Container from "./ui/Container";

const steps = [
  {
    icon: Search,
    title: "Understand",
    description: "We analyze your goals and customer needs.",
  },
  {
    icon: Compass,
    title: "Plan & Strategize",
    description: "We design a customized solution for you.",
  },
  {
    icon: UserPlus,
    title: "Recruit & Train",
    description: "We hire the right talent and train them.",
  },
  {
    icon: Rocket,
    title: "Launch & Operate",
    description: "We go live and ensure smooth operations.",
  },
  {
    icon: LineChart,
    title: "Monitor & Improve",
    description: "We track performance and drive continuous improvement.",
  },
];

function Process() {
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
            How We Deliver Excellence
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Our Proven Process
          </h2>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-7 hidden h-px overflow-hidden bg-navy-950/10 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-navy-700 via-gold-500 to-navy-700"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center lg:text-left"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy-700 bg-white text-navy-700 shadow-[0_8px_20px_-8px_rgba(11,46,109,0.3)] transition-transform duration-300 hover:scale-110 lg:mx-0 mx-auto">
                  <step.icon size={20} />
                </div>

                <p className="mt-5 text-xs font-semibold text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-1 text-base font-bold text-navy-950">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Process;
