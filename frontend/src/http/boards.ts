import { requestInit, sendRequest } from ".";
import type { BoardType } from "../types";

export async function createBoard(
  data: Omit<BoardType, "columns" | "id"> & { columns: string[] },
) {
  const resData = await sendRequest("/boards", requestInit("POST", data));
  if (resData.error) throw resData;
  return resData;
}

export async function getBoards() {
  const data = await sendRequest("/boards", { credentials: "include" });
  if (data.error) throw data;
  return data;
}

export async function getBoard(id: number) {
  const data = await sendRequest(`/boards/${id}`, { credentials: "include" });
  if (data.error) throw data;
  return data;
}

export async function updateBoard(data: BoardType) {
  const resData = await sendRequest(
    `/boards/${data.id}`,
    requestInit("PATCH", data),
  );
  if (resData.error) throw resData;
  return resData;
}
