import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../http/tasks";
import type { BoardType, TaskType } from "../types";
import { queryClient } from "../http";

export default function useUpdateTask(boardId: number) {
  return useMutation({
    mutationFn: ({
      id,
      newFields,
      oldColumnId,
    }: {
      id: number;
      newFields: Partial<TaskType>;
      oldColumnId?: number;
    }) => updateTask({ id, newFields }),
    onSuccess: (data, variables) => {
      const updatedTask: TaskType = data.task;
      let { oldColumnId } = variables;
      if (!oldColumnId) oldColumnId = updatedTask.columnId;

      queryClient.setQueryData(
        ["boards", boardId],
        (oldBoard: { board: BoardType } | undefined) => {
          if (!oldBoard) return oldBoard;
          const board = oldBoard.board;
          const hasMovedColumns =
            oldColumnId && oldColumnId !== updatedTask.columnId;

          return {
            board: {
              ...board,
              columns: hasMovedColumns
                ? board.columns!.map((col) => {
                    if (col.id === oldColumnId)
                      return {
                        ...col,
                        tasks: col.tasks!.filter(
                          (t) => t.id !== updatedTask.id,
                        ),
                      };
                    if (col.id === updatedTask.columnId)
                      return { ...col, tasks: [...col.tasks!, updatedTask] };
                    else return col;
                  })
                : board.columns!.map((col) =>
                    col.id === updatedTask.columnId
                      ? {
                          ...col,
                          tasks: [
                            ...col.tasks!.filter(
                              (t) => t.id !== updatedTask.id,
                            ),
                            updatedTask,
                          ],
                        }
                      : col,
                  ),
            },
          };
        },
      );
    },
  });
}
