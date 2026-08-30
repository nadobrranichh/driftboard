import { type ReactNode } from "react";

export default function Button({
  outlined = false,
  className = "",
  children,
  ...props
}: {
  outlined?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const baseClasses =
    "rounded-lg px-5 py-3 text-md font-medium transition-colors cursor-pointer";
  const filledClasses = "bg-primary text-surface hover:bg-primary-dark";

  const outlinedClasses =
    "bg-surface border border-border text-text hover: bg-bg";
  return (
    <button
      className={`${baseClasses} ${outlined ? outlinedClasses : filledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
