import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../http";
import { createColumn } from "../http/columns";
import type { BoardType } from "../types";

export default function useCreateColumn(boardId: number) {
  return useMutation({
    mutationFn: createColumn,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["boards", boardId],
        (oldBoard: { board: BoardType } | undefined) => {
          if (!oldBoard) return oldBoard;
          const oldData = oldBoard.board;
          return {
            board: {
              ...oldData,
              columns: [...oldData.columns!, { ...data.column, tasks: [] }],
            },
          };
        },
      );
    },
  });
}
