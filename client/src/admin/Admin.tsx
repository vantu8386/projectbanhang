import React from "react";
import SidebarLeft from "./SidebarLeft";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex">
      <SidebarLeft />
      <div className="w-full">
      <Outlet />
      </div>
    </div>
  );
};

export default Admin;
