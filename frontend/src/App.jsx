import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Product from "./pages/Product";
import Resources from "./pages/Resources";
import Solution from "./pages/Solution";
import Home from "./pages/Home";
import Company from "./pages/Company";
import AppLayout from "./components/Layout/AppLayout"; // Ensure this component is defined

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Company",
        element: <Company />,
      },
      {
        path: "/Product",
        element: <Product />,
      },
      {
        path: "/Resources",
        element: <Resources />,
      },
      {
        path: "/Solution",
        element: <Solution />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
