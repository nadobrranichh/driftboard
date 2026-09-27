import { useMutation } from "@tanstack/react-query";
import { createBoard } from "../http/boards";
import { addBoardToCache } from "../utils/query-cache/boards";

export default function useCreateBoard() {
  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => addBoardToCache(data),
    onError: (err) => console.error(err),
  });
}
