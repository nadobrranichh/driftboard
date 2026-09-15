import type { Active, Over } from "@dnd-kit/core";
import { findColumnId } from "../utils/tasks";
import { queryClient } from ".";
import type { BoardType } from "../types";
import type useUpdateTask from "../hooks/useUpdateTask";

export function moveTaskInCache({
  board,
  active,
  over,
}: {
  board: BoardType;
  active: Active;
  over: Over;
}) {
  const activeId = parseInt(active.id.toString());
  const overId = parseInt(over.id.toString());

  const activeColumnId = findColumnId(board, active.id);
  const overColumnId = findColumnId(board, over.id);

  if (!activeColumnId || !overColumnId) return;
  if (activeColumnId === overColumnId) return;

  queryClient.setQueryData(
    ["boards", board.id],
    (oldBoard: { board: BoardType } | null) => {
      if (!oldBoard?.board) return oldBoard;
      const board = oldBoard.board;
      const activeTask = board.columns
        ?.flatMap((col) => col.tasks || [])
        .find((t) => t.id === activeId);
      if (!activeTask) return oldBoard;

      return {
        board: {
          ...board,
          columns: board.columns?.map((col) => {
            if (col.id === activeColumnId)
              return {
                ...col,
                tasks: col.tasks?.filter((t) => t.id !== activeId),
              };
            if (col.id === overColumnId) {
              if (overId === overColumnId)
                return { ...col, tasks: [...(col.tasks || []), activeTask] };

              const overTaskIndex = col.tasks?.findIndex(
                (t) => t.id === overId,
              );
              return {
                ...col,
                tasks: [
                  ...(col.tasks?.slice(0, overTaskIndex) || []),
                  activeTask,
                  ...(col.tasks?.slice(overTaskIndex) || []),
                ],
              };
            }
            return col;
          }),
        },
      };
    },
  );
}

type useUpdateTaskMutateFn = ReturnType<typeof useUpdateTask>["mutate"];

export function syncTaskPosition({
  oldColumnId,
  active,
  board,
  mutate,
}: {
  oldColumnId: number;
  active: Active;
  board: BoardType;
  mutate: useUpdateTaskMutateFn;
}) {
  const activeId = parseInt(active.id.toString());

  const activeColumnId = findColumnId(board, active.id);
  if (!activeColumnId) return;

  const finalBoard = queryClient.getQueryData<{ board: BoardType }>([
    "boards",
    board.id,
  ])?.board;

  if (!finalBoard?.columns) return;
  for (const col of finalBoard.columns) {
    const finalTask = col.tasks?.find((t) => t.id === activeId);
    if (finalTask) {
      if (oldColumnId === activeColumnId) return;
      mutate({
        id: activeId,
        newFields: { columnId: activeColumnId },
        oldColumnId,
      });
    }
  }
}
