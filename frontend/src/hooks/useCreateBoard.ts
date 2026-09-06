import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createBoard } from "../http/boards";

export default function useCreateBoard() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      navigate(`/board/${data.board.id}`, { state: data });
    },
    onError: (err) => console.error(err),
  });
}
