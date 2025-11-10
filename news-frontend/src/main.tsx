import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NewsList from "./pages/NewsList";
import Detail from "./pages/Detail";
import "./index.css";

// ⬇️ seed the demo token BEFORE any requests
import { setToken } from "./apiClient";
setToken(import.meta.env.VITE_DEMO_TOKEN || "DEMO_TOKEN_123");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <NewsList /> },
      { path: "detail", element: <Detail /> },
    ],
  },
]);

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);