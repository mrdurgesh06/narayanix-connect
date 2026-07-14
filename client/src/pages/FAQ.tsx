import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

import Container from "../components/ui/Container";
import CTA from "../components/CTA";

const faqs = [
  {
    question: "What does NARAYANIX Connect actually do?",
    answer:
      "We design and run technology-enabled customer experience, sales enablement and business operations programs — covering customer support, lead management, digital engagement, back-office operations and quality assurance, all backed by a live analytics platform.",
  },
  {
    question: "How is this different from a traditional call center?",
    answer:
      "A traditional call center sells seats. We build outcomes-focused programs: dedicated teams trained on your product, integrated with your CRM, and measured against the metrics that matter to your business — not just call volume.",
  },
  {
    question: "How quickly can a new program go live?",
    answer:
      "Most programs move from kickoff to live operations in 3-6 weeks, depending on hiring volume, training complexity and system integrations required.",
  },
  {
    question: "Can you integrate with our existing CRM and tools?",
    answer:
      "Yes. Our platform is built to integrate with common CRM, helpdesk and telephony systems, so your team works inside the tools you already use rather than a separate silo.",
  },
  {
    question: "How do you measure and maintain quality?",
    answer:
      "Every interaction is scored against a quality framework built around your standards, with continuous monitoring, coaching loops and AI-assisted sentiment analysis surfaced directly on your dashboard.",
  },
  {
    question: "Can programs scale up or down with our business?",
    answer:
      "Yes — teams are built to flex with seasonality and growth. We can add capacity in days for peak periods and scale back down without disrupting service quality.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We support enterprises across healthcare, BFSI, real estate, e-commerce, education, travel & hospitality, automotive and more, adapting workflows to each industry's compliance and customer expectations.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on program scope, channel mix and coverage hours. Book a demo and we'll put together a proposal built around your specific requirements rather than a generic rate card.",
  },
  {
    question: "Is our data handled securely?",
    answer:
      "Yes. We follow enterprise-grade data handling practices with role-based access controls, secure infrastructure and confidentiality agreements as standard across every engagement.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-14 pb-24 lg:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-navy-600/30 blur-[110px]" />
        <div className="pointer-events-none absolute top-24 right-[6%] h-[380px] w-[380px] rounded-full bg-gold-500/10 blur-[110px]" />

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              <HelpCircle size={14} className="text-gold-400" />
              Resources
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60"
            >
              Everything you need to know before getting started. Can't find
              your answer?{" "}
              <a href="/contact" className="font-semibold text-gold-400 hover:text-gold-300">
                Talk to us directly.
              </a>
            </motion.p>
          </div>
        </Container>
      </section>

      {/* FAQ list */}
      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="overflow-hidden rounded-2xl border border-navy-950/5 bg-white shadow-[0_2px_12px_-8px_rgba(11,46,109,0.08)]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-navy-950">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`flex-none text-navy-700 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-7 text-slate-500">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTA />
    </>
  );
}

export default FAQ;