import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import toggler from "../../../../assets/images/3.png";

export default function SideBar() {
  const [isCollape, setIsCollape] = useState(false);

  let toggleCollapse = () => {
    setIsCollape(!isCollape);
  };
  return (
    <>
      <div className="sidebarContainer">
        <Sidebar collapsed={isCollape}>
          <Menu>
            <MenuItem 
            className="firstItem my-4 ps-3"
              onClick={toggleCollapse}
              icon={<img src={toggler} alt="toggle" />}
            ></MenuItem>
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
              icon={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
