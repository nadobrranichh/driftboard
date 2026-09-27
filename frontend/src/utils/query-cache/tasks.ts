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
