import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import LoginForm from "./pages/login/loginForm";
import "./index.css";
import "./reset.css";
import Dashboard from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
