import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute() {
  const { status } = useAuthStore();
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
