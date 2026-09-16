import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";

export default function Section({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className} {...props}>
      <motion.div
        variants={fade({ withStagger: true })}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        className="flex flex-col justify-center items-center gap-3 text-center"
      >
        {children}
      </motion.div>
    </section>
  );
}
