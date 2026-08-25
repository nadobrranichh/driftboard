import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import AuthPage from "../pages/AuthPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <App /> }],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

export default router;
