import type { ReactNode } from "react";
import Logo from "/favicon.svg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <form className="bg-surface flex flex-col gap-5 rounded-md p-5 w-80 border border-primary shadow-xl">
      <div>
        <div className="flex items-center gap-1">
          <img src={Logo} className="h-5" />
          <p>DriftBoard</p>
        </div>
        <p className="text-text-muted text-sm">Work with your plans.</p>
      </div>

      {children}
    </form>
  );
}
