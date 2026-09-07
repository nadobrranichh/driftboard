import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../http/boards";
import type { BoardType } from "../types";

export default function useGetBoard(
  boardId: number,
  initialData?: BoardType | undefined,
) {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId),
    initialData: initialData || null,
  });
}
