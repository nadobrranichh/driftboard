import { type ReactNode } from "react";

export default function Backdrop({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="absolute z-10 h-full w-full top-0 left-0 flex justify-center items-center bg-text/20"
    >
      {children}
    </div>
  );
}
