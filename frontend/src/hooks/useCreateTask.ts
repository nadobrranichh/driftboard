import { useMutation } from "@tanstack/react-query";
import { createTask } from "../http/tasks";
import { addTaskInCache } from "../utils/query-cache/tasks";

export default function useCreateTask(boardId: number) {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (data) => addTaskInCache({ task: data.task, boardId }),
  });
}
