import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { fade } from "../../motion/variants";
import { hoverScale, tapScale } from "../../motion/value-presets";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "filled" | "outlined" | "danger";
  children: ReactNode;
}

export default function Button({
  variant = "filled",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-lg text-md font-medium transition-colors cursor-pointer";

  const variantClasses = {
    filled: "bg-primary text-surface hover:bg-primary-dark",
    outlined:
      "bg-surface border border-border text-text hover:bg-text hover:text-surface",
    danger: "bg-danger text-surface hover:bg-danger-dark",
  };

  return (
    <motion.button
      whileHover={hoverScale}
      whileTap={tapScale}
      variants={fade()}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
