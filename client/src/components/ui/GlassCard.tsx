import { motion } from "framer-motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/30
        bg-white/60
        backdrop-blur-xl
        shadow-[0_15px_45px_rgba(0,0,0,0.08)]
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)]
        transition-all
        duration-300
        ${className}
      `}
    >
      {/* Glow Effect */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>

      {/* Content */}

      <div className="relative z-10">

        {children}

      </div>

    </motion.div>
  );
}

export default GlassCard;