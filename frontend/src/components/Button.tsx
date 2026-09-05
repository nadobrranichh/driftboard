import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    <button
      className={`${baseClasses} ${outlined ? outlinedClasses : filledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
