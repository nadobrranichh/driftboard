import { useMutation } from "@tanstack/react-query";
import { updateBoard } from "../http/boards";
import { updateBoardCache } from "../utils/query-cache/boards";

export default function useUpdateBoard() {
  return useMutation({
    mutationFn: updateBoard,
    onError: (err) => console.error(err),
    onSuccess: (data) => updateBoardCache(data),
  });
}
