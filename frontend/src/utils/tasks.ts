import type { UniqueIdentifier } from "@dnd-kit/core";
import type { BoardType, TaskType } from "../types";

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
