import { ChevronRight, Rocket } from "lucide-react";

export default function Board() {
  return (
    <div className="flex gap-3 p-4 bg-surface rounded-lg border border-border">
      <div className="h-full bg-accent p-2 rounded-lg">
        <Rocket />
      </div>
      <div>
        <p className="font-semibold">Board title</p>
        <p className="text-text-muted text-sm">X cards</p>
      </div>
      <ChevronRight className="ml-auto" />
    </div>
  );
}
