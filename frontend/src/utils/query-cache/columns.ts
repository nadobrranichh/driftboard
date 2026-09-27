import { queryClient } from "../../http";
import type { BoardType, ColumnType } from "../../types";

export function handleAddColumn({ column }: { column: ColumnType }) {
  queryClient.setQueryData(
    ["boards", column.boardId],
    (oldBoard: { board: BoardType } | undefined) => {
      const board = oldBoard?.board;
      if (!board) return oldBoard;
      return {
        board: {
          ...board,
          columns: [...(board.columns || []), { ...column, tasks: [] }],
        },
      };
    },
  );
}
