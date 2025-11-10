import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import NewsList from "./pages/NewsList"
import Detail from "./pages/Detail"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <NewsList /> },
    { path: "detail", element: <Detail /> }
  ]}
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)