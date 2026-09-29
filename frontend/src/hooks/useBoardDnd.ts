import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { findColumnId } from "../utils/tasks";
import { moveTaskInCache, syncTaskPosition } from "../http/boardCacheUpdates";
import type { BoardType, TaskType } from "../types";
import useUpdateTask from "./useUpdateTask";
import { useRef } from "react";

export default function useBoardDnd(board: BoardType | null) {
  const updateTask = useUpdateTask(board?.id ?? 0);
  const startDraggingRef = useRef<Partial<TaskType>>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10, tolerance: 5, delay: 75 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(e: DragStartEvent) {
    if (!board?.columns) return;
    const columnId = findColumnId(board, e.active.id);
    if (!columnId) return;
    startDraggingRef.current = { columnId };
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!active || !over || !board?.columns) return;
    moveTaskInCache({ board, active, over });
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active } = e;
    if (!active || !board?.columns) return;
    const oldColumnId = startDraggingRef.current?.columnId;
    if (!oldColumnId) return;

    syncTaskPosition({
      oldColumnId,
      active,
      boardId: board.id,
      mutate: updateTask.mutate,
    });

    startDraggingRef.current = null;
  }

  return { sensors, handleDragStart, handleDragOver, handleDragEnd };
}
