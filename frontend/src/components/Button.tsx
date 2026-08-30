import { type ReactNode } from "react";

export default function Button({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  return (
    <button className="bg-primary text-surface rounded-md px-2 py-2" {...props}>
      {children}
    </button>
  );
}
