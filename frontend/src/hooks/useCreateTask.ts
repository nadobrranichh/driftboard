import { useMutation } from "@tanstack/react-query";
import { createTask } from "../http/tasks";
import { queryClient } from "../http";
import type { BoardType } from "../types";

export default function useCreateTask(boardId: number) {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      //add task to board's query data
      queryClient.setQueryData(
        ["boards", boardId],
        (oldBoard: { board: BoardType } | undefined) => {
          if (!oldBoard) return oldBoard;
          const oldData = oldBoard.board;
          return {
            board: {
              ...oldData,
              columns: oldData.columns!.map((col) =>
                col.id === data.task.columnId
                  ? { ...col, tasks: [...col.tasks!, data.task] }
                  : col,
              ),
            },
          };
        },
      );
    },
  });
}
