import { motion } from "framer-motion";
import CountUp from "react-countup";

type StatCardProps = {
  value: number;
  suffix?: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
};

function StatCard({
  value,
  suffix = "",
  title,
  icon,
  color = "from-blue-600 to-cyan-500",
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl p-8"
    >
      {/* Background */}

      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}
      />

      {/* Icon */}

      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} text-white flex items-center justify-center shadow-lg`}
      >
        {icon}
      </div>

      {/* Number */}

      <h3 className="mt-6 text-4xl font-extrabold text-slate-900">

        <CountUp
          end={value}
          duration={2}
        />

        {suffix}

      </h3>

      {/* Title */}

      <p className="mt-3 text-slate-600 text-lg">

        {title}

      </p>

    </motion.div>
  );
}

export default StatCard;