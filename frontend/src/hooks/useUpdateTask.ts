import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../http/tasks";
import type { TaskType } from "../types";
import { updateTaskInCache } from "../utils/query-cache/tasks";

export default function useUpdateTask(boardId: number) {
  return useMutation({
    mutationFn: ({
      id,
      newFields,
      oldColumnId,
      rebalance = false,
    }: {
      id: number;
      newFields: Partial<TaskType>;
      oldColumnId?: number;
      rebalance?: boolean;
    }) => updateTask({ id, newFields, rebalance }),
    onSuccess: (data, variables) => {
      const { task, tasks } = data;
      updateTaskInCache({
        task,
        boardId,
        tasks,
        oldColumnId: variables.oldColumnId,
      });
    },
  });
}
