import { queryClient } from "../../http";
import type { BoardType, ColumnType, TaskType } from "../../types";

export function addTaskInCache({
  task,
  boardId,
}: {
  task: TaskType;
  boardId: number;
}) {
  queryClient.setQueryData(
    ["boards"],
    (oldBoards: { boards: BoardType[] } | undefined) => {
      if (!oldBoards?.boards) return;
      return {
        boards: oldBoards.boards.map((board) =>
          board.id !== boardId
            ? board
            : {
                ...board,
                taskCount: board.taskCount ? board.taskCount + 1 : 1,
              },
        ),
      };
    },
  );

  queryClient.setQueryData(
    ["boards", boardId],
    (oldBoard: { board: BoardType } | undefined) => {
      if (!oldBoard) return oldBoard;
      const oldData = oldBoard.board;
      return {
        board: {
          ...oldData,
          columns: oldData.columns!.map((col: ColumnType) =>
            col.id === task.columnId
              ? { ...col, tasks: [...col.tasks!, task] }
              : col,
          ),
          taskCount: oldData.taskCount ? oldData.taskCount + 1 : 1,
        },
      };
    },
  );
}

export function updateTaskInCache({
  task: updatedTask,
  boardId,
  tasks: updatedTasks,
  oldColumnId,
}: {
  task: TaskType;
  boardId: number;
  tasks?: TaskType[];
  oldColumnId?: number;
}) {
  if (!oldColumnId) oldColumnId = updatedTask.columnId;

  queryClient.setQueryData(
    ["boards", boardId],
    (oldBoard: { board: BoardType } | undefined) => {
      if (!oldBoard) return oldBoard;
      const board = oldBoard.board;

      const columns = board.columns!.map((col) => {
        const isFilterColumn =
          col.id === oldColumnId || col.id === updatedTask.columnId;

        return {
          ...col,
          tasks: isFilterColumn
            ? col.tasks!.filter((t) => t.id !== updatedTask.id)
            : col.tasks,
        };
      });

      const targetCol = columns.find((c) => c.id === updatedTask.columnId);
      if (targetCol) {
        if (updatedTasks) targetCol.tasks = updatedTasks;
        else targetCol.tasks = [...(targetCol.tasks || []), updatedTask];
      }

      return { board: { ...board, columns } };
    },
  );
}
