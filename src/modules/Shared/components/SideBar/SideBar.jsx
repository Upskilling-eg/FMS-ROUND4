import React, { useState, useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import toggler from "../../../../assets/images/sidebar-logo.png";
import { AuthContext } from "../../../../context/AuthContext";

export default function SideBar() {
  const [isCollape, setIsCollape] = useState(false);
  let { loginData } = useContext(AuthContext);
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
              border: "none",
              background: "none",
            }}
          >
            <img
              src={toggler}
              style={{
                width: isCollape ? "4rem" : "8rem",
                transition: "all 300ms",
              }}
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
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-users" aria-hidden="true"></i>}
                component={<Link to="/dashboard/users" />}
              >
                {" "}
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa fa-list" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipesList" />}
            >
              Recipes
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-list-alt" aria-hidden="true"></i>}
                component={<Link to="/dashboard/categoriesList" />}
              >
                Categories
              </MenuItem>
            ) : (
              ""
            )}

            {loginData?.userGroup != "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-list" aria-hidden="true"></i>}
                component={<Link to="/dashboard/favourites"></Link>}
              >
                Favourites
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              icon={<i className="fa fa-sign-out" aria-hidden="true"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
