import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import App from "../App";
import HomePage from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import TaskDetail from "../components/TaskDetail";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "home", element: <HomePage /> },
      {
        path: "board/:boardId",
        element: <BoardPage />,
        children: [{ path: "task/:taskId", element: <TaskDetail /> }],
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
