import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "../../../http/boards";
import { deleteBoardFromCache } from "../../../utils/query-cache/boards";
import { useNavigate } from "react-router";

export default function useDeleteBoard(boardId: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      deleteBoardFromCache({ boardId: Number(boardId) });
      navigate("/home");
    },
  });
}
