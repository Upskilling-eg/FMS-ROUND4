import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logoSidebar from "../../../../assets/images/logo-sidebar.png";

export default function SideBar() {
  const [isCollape, setIsCollape] = useState(false);
  const navigate = useNavigate();
  let toggleCollapse = () => {
    setIsCollape(!isCollape);
  };
  return (
    <>
      <div className="sidebarContainer">
        <Sidebar collapsed={isCollape}>
          <button
            onClick={toggleCollapse}
            style={{
              background: "none",
              border: "none",
              marginBottom: "4rem",
            }}
          >
            <img
              style={{
                width: isCollape ? "4rem" : "8rem",
                transition: "all 300ms",
              }}
              src={logoSidebar}
              alt="toggle"
            />
          </button>
          <Menu>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipesList" />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard/categoriesList" />}
            >
              Categories
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              icon={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
