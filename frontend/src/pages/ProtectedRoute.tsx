import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function ProtectedRoute() {
  const { status, setSocket } = useAuthStore();

  useEffect(() => {
    if (status !== "authenticated") return;
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [status, setSocket]);

  if (status === "unauthenticated") return <Navigate to="/auth" replace />;
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center">
        <p>Authenticating...</p>
      </main>
    );
  }
  return <Outlet />;
}
