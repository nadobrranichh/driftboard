import { ChevronRight } from "lucide-react";
import type { BoardType } from "../types";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import { isSingular } from "../utils/strings";
import { useNavigate } from "react-router";

export default function Board({ data }: { data: BoardType }) {
  const navigate = useNavigate();
  const Icon = boardIcons[data.icon];
  const colors =
    boardColorRamps[data.iconColor as keyof typeof boardColorRamps];
  return (
    <div
      className="flex gap-3 p-4 bg-surface rounded-lg border border-border"
      onClick={() => navigate(`/board/${data.id}`)}
    >
      <div
        className={`h-full p-3 rounded-lg`}
        style={{ backgroundColor: colors.bg }}
      >
        <Icon color={colors.fg} />
      </div>
      <div>
        <p className="font-semibold">{data.title}</p>
        <p className="text-text-muted text-sm">
          {data.taskCount} task{!isSingular(data.taskCount!) && "s"}
        </p>
      </div>
      <ChevronRight className="ml-auto my-auto" />
    </div>
  );
}
