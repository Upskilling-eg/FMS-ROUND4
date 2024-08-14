import React from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="sidebar-cont">
          <SideBar />
        </div>
        <div className="w-100 px-3">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
