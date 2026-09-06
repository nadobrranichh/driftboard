import { requestInit, sendRequest } from ".";

export async function createTask(task: {
  title: string;
  description: string;
  dueDate: string;
  columnId: number;
}) {
  const data = await sendRequest(
    "/tasks",
    requestInit("POST", { ...task, position: 0, assigneeId: null }),
  );
  if (data.error) throw data;
  return data;
}
