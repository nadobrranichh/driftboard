import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import TaskDetail from "../components/TaskDetail";
import NotFoundPage from "../pages/NotFoundPage";
import LandingPage from "../pages/LandingPage";
import BoardSettings from "../components/BoardSettings";
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
            children: [
              { path: "task/:taskId", element: <TaskDetail /> },
              { path: "settings", element: <BoardSettings /> },
            ],
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
