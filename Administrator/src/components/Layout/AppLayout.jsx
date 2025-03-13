import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar"



const AppLayout = () => {

  return (
    <div>

        <>
          
          <Outlet />
          
        </>

    </div>
  );
};

export default AppLayout;
