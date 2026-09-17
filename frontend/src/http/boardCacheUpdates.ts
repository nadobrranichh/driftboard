import type { Active, Over } from "@dnd-kit/core";
import { findColumnId, findFirstTask } from "../utils/tasks";
import { queryClient } from ".";
import type { BoardType } from "../types";
import type useUpdateTask from "../hooks/useUpdateTask";

const POSITION_DIFFERENCE = Math.pow(2, 15);

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

  if (activeId === overId) return;

  const activeColumnId = findColumnId(board, active.id);
  const overColumnId = findColumnId(board, over.id);

  if (!activeColumnId || !overColumnId) return;

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
            let resultColumn = col;
            if (resultColumn.id === activeColumnId) {
              // removing task from the column where it was
              resultColumn = {
                ...resultColumn,
                tasks: resultColumn.tasks?.filter((t) => t.id !== activeId),
              };
            }

            if (resultColumn.id === overColumnId) {
              // adding task to the column it's dragged to
              let position;
              if (overId === overColumnId) {
                // if not over a task - adding to the start
                const firstTask = findFirstTask(resultColumn);
                position = firstTask
                  ? firstTask.position - POSITION_DIFFERENCE
                  : 0;
              } else {
                // if over a task
                const sortedTasks = resultColumn.tasks?.toSorted(
                  (a, b) => a.position - b.position,
                );
                const overTaskIndex = sortedTasks?.findIndex(
                  (t) => t.id === overId,
                );
                if (
                  !sortedTasks ||
                  overTaskIndex === undefined ||
                  overTaskIndex === -1
                )
                  return resultColumn;
                //over the first task
                if (overTaskIndex === 0)
                  position =
                    sortedTasks[overTaskIndex].position - POSITION_DIFFERENCE;
                // over the last task
                else if (overTaskIndex === sortedTasks.length - 1)
                  position =
                    sortedTasks[overTaskIndex].position + POSITION_DIFFERENCE;
                // in between tasks
                else
                  position =
                    (sortedTasks[overTaskIndex].position +
                      sortedTasks[overTaskIndex - 1].position) /
                    2;
              }

              resultColumn = {
                ...resultColumn,
                tasks: [
                  ...(resultColumn.tasks || []),
                  { ...activeTask, columnId: overColumnId, position },
                ],
              };
            }
            return resultColumn;
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
  boardId,
  mutate,
}: {
  oldColumnId: number;
  active: Active;
  boardId: number;
  mutate: useUpdateTaskMutateFn;
}) {
  const activeId = parseInt(active.id.toString());
  const finalBoard = queryClient.getQueryData<{ board: BoardType }>([
    "boards",
    boardId,
  ])?.board;
  if (!finalBoard?.columns) return;

  const activeColumnId = findColumnId(finalBoard, active.id);
  if (!activeColumnId) return;

  const column = finalBoard.columns.find((col) => col.id === activeColumnId);
  const task = column?.tasks?.find((t) => t.id === activeId);
  if (!task) return;

  mutate({
    id: activeId,
    newFields: { columnId: activeColumnId, position: task.position },
    oldColumnId,
  });
}
