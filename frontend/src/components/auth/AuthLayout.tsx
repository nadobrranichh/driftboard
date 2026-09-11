import type { ReactNode, SyntheticEvent } from "react";
import Logo from "/favicon.svg";

export default function AuthLayout({
  onSubmit,
  children,
}: {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface flex flex-col gap-5 rounded-xl p-5 w-80 border border-primary shadow-xl"
    >
      <div>
        <div className="flex items-center gap-1">
          <div className="bg-primary rounded-md p-1">
            <img src={Logo} className="h-5 w-5 object-contain" />
          </div>
          <p className="font-bold text-primary">DriftBoard</p>
        </div>
        <p className="text-text-muted text-sm mt-1">Work with your plans.</p>
      </div>

      {children}
    </form>
  );
}
