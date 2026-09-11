import { sendRequest } from ".";

export async function getUserByEmail(email: string) {
  const res = await sendRequest(`/users?email=${email}`, {
    credentials: "include",
  });
  if (res.error) throw res;
  return res;
}
