import { queryClient } from "../http";
import type { BoardType } from "../types";

export function handleRemovedFromBoard({ boardId }: { boardId: number }) {
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

export function handleAddedToBoard({ board }: { board: BoardType }) {
  queryClient.setQueryData(
    ["boards"],
    (oldBoards: { boards: BoardType[] } | null) => {
      const boards = oldBoards?.boards;
      if (!boards) return oldBoards;
      return {
        boards: [...boards, board],
      };
    },
  );
}

export function handleBoardUpdated({
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
