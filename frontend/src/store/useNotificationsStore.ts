import { create } from "zustand";

type NotificationsState = {
  notifications: string[];
  addNotification: (text: string) => void;
  removeNotification: (text: string) => void;
  clearNotifications: () => void;
};

const NOTIFICATION_TIMEOUT_MS = 2000;

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  addNotification(text: string) {
    set((state) => ({ notifications: [...state.notifications, text] }));
    setTimeout(() => {
      get().removeNotification(text);
    }, NOTIFICATION_TIMEOUT_MS);
  },
  removeNotification(text: string) {
    set((state) => ({
      notifications: state.notifications.filter((n) => n !== text),
    }));
  },
  clearNotifications() {
    set({ notifications: [] });
  },
}));
