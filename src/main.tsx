import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Settings from "./routes/Settings";
import Layout from "./routes/Layout";
import Dashboard from "./routes/Dashboard";
import Locations from "./routes/Locations";
import Issues from "./routes/Issues";
import Auth from "./routes/Auth";
import Staff from "./routes/Staff";
import Inventory from "./routes/Inventory";

const router = createBrowserRouter([
  {
    element: <Auth />,
    path: "/auth"
  },
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/locations",
        element: <Locations />
      },
      {
        path: "/issues",
        element: <Issues />
      },
      {
        path: "/staff",
        element: <Staff />
      },
      {
        path: "/inventory",
        element: <Inventory />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
