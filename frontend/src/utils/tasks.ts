import type { UniqueIdentifier } from "@dnd-kit/core";
import type { BoardType, ColumnType, TaskType } from "../types";

export function findColumnId(
  board: BoardType | null,
  taskId: UniqueIdentifier,
): number | null {
  if (!board?.columns) return null;
  if (taskId.toString().endsWith("-column")) return parseInt(taskId.toString());

  const idToCompare = parseInt(taskId.toString());

  for (const column of board.columns) {
    if (column.tasks?.some((t: TaskType) => t.id === idToCompare))
      return column.id;
  }
  return null;
}

export function getColumn(
  board: BoardType,
  columnId: number,
): ColumnType | null {
  return board.columns?.find((col) => col.id === columnId) || null;
}

export function findFirstTask(column: ColumnType) {
  if (!column.tasks || column.tasks.length === 0) return null;
  return (
    column.tasks.reduce(
      (prev, cur) => (cur.position < prev.position ? cur : prev),
      column.tasks[0],
    ) || null
  );
}
