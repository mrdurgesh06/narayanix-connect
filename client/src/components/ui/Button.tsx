import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  showArrow?: boolean;
};

function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  showArrow = false,
}: Props) {
  const styles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-xl",

    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white shadow-lg",

    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  const common =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 font-semibold transition duration-300";

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: .98 }}>
        <Link
          to={to}
          className={`${common} ${styles[variant]} ${className}`}
        >
          {children}

          {showArrow && <ArrowRight size={18} />}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: .98 }}
      onClick={onClick}
      className={`${common} ${styles[variant]} ${className}`}
    >
      {children}

      {showArrow && <ArrowRight size={18} />}
    </motion.button>
  );
}

export default Button;