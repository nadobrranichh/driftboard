import { ArrowLeft, Settings } from "lucide-react";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import type { BoardType } from "../types";

export default function BoardHeader({
  onNavigateHome,
  onOpenSettings,
  board,
}: {
  onNavigateHome: () => void;
  onOpenSettings: () => void;
  board: BoardType | null;
}) {
  const Icon = board ? boardIcons[board.icon] : null;
  const colors = board
    ? boardColorRamps[board.iconColor as keyof typeof boardColorRamps]
    : null;

  return (
    <div className=" flex flex-col justify-start items-center gap-1 -mt-3">
      <div
        className={`h-full p-1.5 rounded-lg`}
        style={{ backgroundColor: colors?.bg || "" }}
      >
        {Icon && <Icon style={{ height: "1.5rem" }} color={colors?.fg} />}
      </div>

      <button
        className="absolute left-3 cursor-pointer"
        onClick={onNavigateHome}
      >
        <ArrowLeft className="text-text-muted" />
      </button>
      <button
        className="absolute right-3 cursor-pointer"
        onClick={onOpenSettings}
      >
        <Settings className="text-text-muted" />
      </button>

      <h2 className="font-bold text-xl mb-2">{board?.title}</h2>
    </div>
  );
}
