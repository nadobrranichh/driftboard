import type { ColumnType } from "../types";

export default function ColumnPill({
  data,
  activeColumnId,
  handleClick,
}: {
  data: ColumnType;
  activeColumnId: number;
  handleClick: () => void;
}) {
  return (
    <div
      className="rounded-3xl border border-border bg-surface py-2 px-4"
      style={{
        backgroundColor:
          activeColumnId === data.id
            ? "var(--color-primary)"
            : "var(--color-surface)",
        color: activeColumnId === data.id ? "var(--color-surface)" : "black",
      }}
      onClick={handleClick}
    >
      {data.title} &bull; {data.tasks!.length}
    </div>
  );
}
