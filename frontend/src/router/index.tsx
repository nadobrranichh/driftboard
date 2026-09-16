import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import NotFoundPage from "../pages/NotFoundPage";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "../pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <HomePage /> },
          {
            path: "board/:boardId",
            element: <BoardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
