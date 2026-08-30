import type { ReactNode } from "react";

export default function Section({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex flex-col justify-center items-center gap-3 text-center ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
