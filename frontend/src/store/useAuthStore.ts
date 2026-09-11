import { create } from "zustand";
import { sendRequest } from "../http";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  status: "unauthenticated" | "loading" | "authenticated";
  setUser: (user: User) => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  setUser(user: User) {
    set({ user, status: "authenticated" });
  },
  logout() {
    set({ user: null, status: "unauthenticated" });
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
