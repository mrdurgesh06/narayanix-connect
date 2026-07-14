import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

import Container from "./ui/Container";

const placeholders = Array.from({ length: 6 });

function TrustedCompanies() {
  return (
    <section className="border-b border-navy-950/5 bg-white py-14">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
        >
          Trusted by Growing Businesses
        </motion.p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {placeholders.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex h-16 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 text-slate-300 transition-colors hover:border-navy-700/30 hover:text-navy-700/50"
            >
              <Building2 size={16} />
              <span className="text-xs font-medium">Partner Logo</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustedCompanies;
