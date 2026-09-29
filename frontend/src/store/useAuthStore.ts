import { create } from "zustand";
import { sendRequest } from "../http";
import type { Socket } from "socket.io-client";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  status: "unauthenticated" | "loading" | "authenticated";
  socket: Socket | null;
  setUser: (user: User) => void;
  setSocket: (socket: Socket | null) => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  socket: null,
  setUser(user: User) {
    set({ user, status: "authenticated" });
  },
  setSocket(socket: Socket | null) {
    set({ socket });
  },
  logout() {
    if (this.socket) this.socket.disconnect();
    set({ user: null, status: "unauthenticated", socket: null });
  },
  fetchCurrentUser: async () => {
    set({ status: "loading" });
    try {
      const res = await sendRequest("/auth/me", { credentials: "include" });
      if (!res.ok) {
        set({ user: null, status: "unauthenticated" });
        return;
      }

      set({ user: res.user, status: "authenticated" });
    } catch {
      set({ user: null, status: "unauthenticated" });
    }
  },
}));
