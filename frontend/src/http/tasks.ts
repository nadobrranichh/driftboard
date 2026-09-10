import { requestInit, sendRequest } from ".";
import type { TaskType } from "../types";

export async function createTask(task: Omit<TaskType, "id" | "position">) {
  const data = await sendRequest(
    "/tasks",
    requestInit("POST", { ...task, position: 0, assigneeId: null }),
  );
  if (data.error) throw data;
  return data;
}

export async function updateTask({
  id,
  newFields,
}: {
  id: number;
  newFields: Partial<TaskType>;
}) {
  const updatedTask = await sendRequest(
    `/tasks/${id}`,
    requestInit("PATCH", newFields),
  );
  if (updatedTask.error) throw updatedTask;
  return updatedTask;
}
