import type { BoardType } from "../../types";
import { queryClient } from "../../http";

export function addBoardToCache({ board }: { board: BoardType }) {
  queryClient.setQueryData(
    ["boards"],
    (oldBoards: { boards: BoardType[] } | null) => {
      const boards = oldBoards?.boards;
      if (!boards) return oldBoards;

      const taskCount = board.taskCount || 0;
      return {
        boards: [...boards, { ...board, taskCount }],
      };
    },
  );
}

export function removeBoardFromCache({ boardId }: { boardId: number }) {
  queryClient.setQueryData(
    ["boards"],
    (oldBoards: { boards: BoardType[] } | null) => {
      const boards = oldBoards?.boards;
      if (!boards) return oldBoards;
      return {
        boards: boards.filter((board) => board.id !== boardId),
      };
    },
  );

  if (queryClient.getQueryData(["boards", boardId])) {
    queryClient.setQueryData(["boards", boardId], null);
  }
}

export function updateBoardCache({
  board: boardToUpdate,
}: {
  board: BoardType;
}) {
  if (queryClient.getQueryData(["boards", boardToUpdate.id])) {
    queryClient.setQueryData(
      ["boards", boardToUpdate.id],
      ({ board }: { board: BoardType }) => {
        return { board: { ...board, ...boardToUpdate } };
      },
    );
  }

  queryClient.setQueryData(
    ["boards"],
    (oldBoards: { boards: BoardType[] } | null) => {
      const boards = oldBoards?.boards;
      if (!boards) return oldBoards;
      return {
        boards: boards.map((board) =>
          board.id !== boardToUpdate.id
            ? board
            : { ...board, ...boardToUpdate },
        ),
      };
    },
  );
}
