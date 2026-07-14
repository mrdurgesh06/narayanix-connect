import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type SectionTitleProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

function SectionTitle({
  badge,
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? "text-center" : ""}
    >
      {/* Badge */}

      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold text-sm mb-5">

          <Sparkles size={16} />

          {badge}

        </div>
      )}

      {/* Heading */}

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">

        {title}

      </h2>

      {/* Gradient Line */}

      <div
        className={`mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 ${
          center ? "mx-auto" : ""
        }`}
      ></div>

      {/* Subtitle */}

      {subtitle && (
        <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">

          {subtitle}

        </p>
      )}
    </motion.div>
  );
}

export default SectionTitle;