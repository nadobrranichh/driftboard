import { requestInit, sendRequest } from ".";

export async function createColumn({
  title,
  boardId,
}: {
  title: string;
  boardId: number;
}) {
  const res = await sendRequest(
    `/boards/${boardId}/columns`,
    requestInit("POST", { title }),
  );
  if (res.error) throw res;
  return res;
}
