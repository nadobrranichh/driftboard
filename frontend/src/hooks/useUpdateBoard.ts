import { useMutation } from "@tanstack/react-query";
import { updateBoard } from "../http/boards";
import { queryClient } from "../http";
import type { BoardType } from "../types";

export default function useUpdateBoard(boardId: number) {
  return useMutation({
    mutationFn: updateBoard,
    onError: (err) => console.error(err),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["boards", boardId],
        (oldBoard: { board: BoardType } | null) => {
          const board = oldBoard?.board;
          if (!board) return oldBoard;
          return {
            board: { ...board, ...data.board },
          };
        },
      );
    },
  });
}
