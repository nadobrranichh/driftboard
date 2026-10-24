import { requestInit, sendRequest } from ".";

export async function login(data: { email: string; password: string }) {
  const resData = await sendRequest("/auth/login", requestInit("POST", data));
  if (resData.error) throw resData;
  return resData;
}

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const resData = await sendRequest("/auth/signup", requestInit("POST", data));
  if (resData.error) throw resData;
  return resData;
}
