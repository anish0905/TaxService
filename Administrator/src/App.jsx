import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import Login from "./components/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import SubAdminDashboard from "./pages/SubAdmin/SubAdminDashboard";
import HeroSection from "./pages/SubAdmin/ContentEdit/HeroSection";
import Services from "./pages/SubAdmin/ContentEdit/Services";

// Function to get user role from localStorage
const getUserRole = () => {
  return localStorage.getItem("role"); // Assuming 'role' is stored as 'admin' or 'subadmin'
};

// Conditionally set the dashboard path
const dashboardElement = getUserRole() === "subAdmin" ? <SubAdminDashboard /> : <Dashboard />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: dashboardElement,
  },
  {
    path: "/home-video-edit",
    element: <HeroSection/>,
  },
  {
    path: "/home-services-edit",
    element: <Services/>,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
