import type { ColumnType } from "../types";

export default function ColumnPill({
  data,
  isActive,
  onClick,
}: {
  data: ColumnType;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="rounded-3xl border border-border bg-surface py-2 px-4"
      style={{
        backgroundColor: isActive
          ? "var(--color-primary)"
          : "var(--color-surface)",
        color: isActive ? "var(--color-surface)" : "black",
      }}
      onClick={onClick}
    >
      {data.title} &bull; {data.tasks!.length}
    </div>
  );
}
