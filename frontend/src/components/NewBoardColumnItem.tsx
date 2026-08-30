import { Pencil, X } from "lucide-react";

export default function NewBoardColumnItem() {
  return (
    <div className="bg-text rounded-md flex justify-between items-center p-1.5">
      <p className="text-surface">Column name</p>
      <div className="flex items-center gap-1">
        <Pencil size={20} className="text-surface" />
        <X size={23} className="text-surface" />
      </div>
    </div>
  );
}
