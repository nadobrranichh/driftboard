import { Circle, Bell } from "lucide-react";
import Logo from "/favicon.svg";

export default function Header() {
  return (
    <header className="flex p-6 bg-surface border-b border-b-border justify-between">
      <div className="flex items-center gap-1">
        <div className="bg-primary rounded-md p-1">
          <img src={Logo} className="h-5 w-5 object-contain" />
        </div>
        <p className="font-bold">DriftBoard</p>
      </div>
      <div className="flex gap-4">
        <Bell className="text-text-muted" />
        <Circle className="text-text-muted" />
      </div>
    </header>
  );
}
2;
