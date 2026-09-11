import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const { user, fetchCurrentUser } = useAuthStore();
  useEffect(() => {
    if (!user) fetchCurrentUser();
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
