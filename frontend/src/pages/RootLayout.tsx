import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationsStore } from "../store/useNotificationsStore";
import NotificationBlock from "../components/NotificationBlock";
import { AnimatePresence } from "motion/react";

export default function RootLayout() {
  const { user, fetchCurrentUser } = useAuthStore();
  const { notifications } = useNotificationsStore();
  useEffect(() => {
    if (!user) fetchCurrentUser();
  }, []);
  return (
    <>
      <Header />
      <div className="absolute flex flex-col gap-5 right-6 top-25">
        <AnimatePresence>
          {notifications.toReversed().map((n) => (
            <NotificationBlock key={n} text={n} />
          ))}
        </AnimatePresence>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
