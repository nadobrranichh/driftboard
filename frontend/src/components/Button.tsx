import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { fade } from "../motion/variants";
import { hoverScale, tapScale } from "../motion/value-presets";

interface ButtonProps extends HTMLMotionProps<"button"> {
  outlined?: boolean;
  children: ReactNode;
}

export default function Button({
  outlined = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-lg text-md font-medium transition-colors cursor-pointer";
  const filledClasses = "bg-primary text-surface hover:bg-primary-dark";
  const outlinedClasses =
    "bg-surface border border-border text-text hover: bg-bg";
  return (
    <motion.button
      whileHover={hoverScale}
      whileTap={tapScale}
      variants={fade()}
      className={`${baseClasses} ${outlined ? outlinedClasses : filledClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
