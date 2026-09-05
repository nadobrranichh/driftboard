import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
    mode: "cors",
  });
  const resData = await res.json();
  if (resData.error) throw resData;
  return resData;
}

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
    mode: "cors",
  });
  const resData = await res.json();
  if (resData.error) throw resData;
  return resData;
}
