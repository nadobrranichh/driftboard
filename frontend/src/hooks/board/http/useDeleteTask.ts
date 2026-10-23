import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "../../../http/tasks";
import { deleteTaskInCache } from "../../../utils/query-cache/tasks";

export default function useDeleteTask(boardId: number) {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      const { taskId, columnId } = data;
      deleteTaskInCache({ boardId, taskId, columnId });
    },
  });
}
