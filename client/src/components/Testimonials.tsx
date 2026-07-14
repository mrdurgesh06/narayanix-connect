import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";

import Container from "./ui/Container";

const testimonials = [
  {
    quote:
      "Narayanix Connect became an extension of our team within weeks. Response times dropped and our CSAT climbed almost immediately.",
    name: "Aditya Kapoor",
    designation: "Head of Customer Success",
    company: "Finlytics",
    photo: "/images/testimonials/client-1.jpg",
  },
  {
    quote:
      "The dashboards alone changed how we manage the program — we finally have visibility into quality, not just volume.",
    name: "Meera Nair",
    designation: "VP Operations",
    company: "Kavella Retail",
    photo: "/images/testimonials/client-2.jpg",
  },
  {
    quote:
      "Their team scaled with us from 15 to 120 seats without a dip in service quality. That's rare.",
    name: "Vikram Suri",
    designation: "COO",
    company: "Horizon Health",
    photo: "/images/testimonials/client-3.jpg",
  },
];

function Testimonials() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700">
            Client Stories
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Trusted by Teams Who Take CX Seriously
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_16px_-8px_rgba(11,46,109,0.08)]"
            >
              <Quote size={26} className="text-gold-500" />

              <p className="mt-4 flex-1 text-[15px] leading-7 text-slate-600">
                "{t.quote}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-navy-950/5 pt-5">
                <div className="relative h-11 w-11 flex-none overflow-hidden rounded-full bg-navy-50">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    aria-label={`Play video testimonial from ${t.name}`}
                    className="absolute inset-0 flex items-center justify-center bg-navy-950/40 opacity-0 transition-opacity hover:opacity-100"
                  >
                    <Play size={14} className="fill-white text-white" />
                  </button>
                </div>

                <div>
                  <p className="text-sm font-bold text-navy-950">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.designation}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
