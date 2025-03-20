import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import Login from "./components/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import SubAdminDashboard from "./pages/SubAdmin/SubAdminDashboard";
import HeroSection from "./pages/SubAdmin/ContentEdit/HeroSection";
import Services from "./pages/SubAdmin/ContentEdit/Services";
import ServiceList from "./pages/SubAdmin/List/ServiceList";
import BlogForm from "./pages/SubAdmin/Blogs/BlogForm";
import BlogList from "./pages/SubAdmin/Blogs/BlogList";
import ContactUS from "./pages/SubAdmin/ContactUS";

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
    path: "/home-services-list",
    element: <ServiceList/>,
  },
  {
    path: "/home-services-blogs-form",
    element: <BlogForm/>,

  },
  {
    path: "/home-services-blogs-list",
    element: <BlogList/>,
  }
  ,
 
  {
    path: "/contactus-client-details",
    element: <ContactUS/>,
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
