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
      rebalance = false,
    }: {
      id: number;
      newFields: Partial<TaskType>;
      oldColumnId?: number;
      rebalance?: boolean;
    }) => updateTask({ id, newFields, rebalance }),
    onSuccess: (data, variables) => {
      const updatedTask: TaskType = data.task;
      const updatedTasks: TaskType[] = data.tasks;

      let { oldColumnId } = variables;
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
    },
  });
}
