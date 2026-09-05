import { requestInit, sendRequest } from ".";

export async function createBoard(data: {
  title: string;
  columns: string[];
  icon: string;
  iconColor: string;
}) {
  const resData = await sendRequest("/boards", requestInit("POST", data));
  if (resData.error) throw resData;
  return resData;
}

export async function getBoards() {
  const data = await sendRequest("/boards", { credentials: "include" });
  if (data.error) throw data;
  return data;
}
