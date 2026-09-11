import { useMutation } from "@tanstack/react-query";
import { createBoard } from "../http/boards";
import { queryClient } from "../http";
import type { BoardType } from "../types";

export default function useCreateBoard() {
  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["boards"],
        (oldBoards: { boards: BoardType[] } | null) => {
          const boards = oldBoards?.boards;
          if (!boards) return oldBoards;
          return {
            boards: [...boards, { ...data.board, taskCount: 0 }],
          };
        },
      );
    },
    onError: (err) => console.error(err),
  });
}
