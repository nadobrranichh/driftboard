import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function sendRequest(endpoint: string, init?: RequestInit) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
    init,
  );
  const resData = await res.json();
  return resData;
}

export const requestInit = (method: string, data: any): RequestInit => ({
  method: method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
  credentials: "include",
  mode: "cors",
});
