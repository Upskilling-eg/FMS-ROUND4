import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
export default function AuthLayout() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white px-5 py-3 rounded rounded-2">
            <div className="">
              <div className="text-center mb-3">
                <img src={logo} alt="food-logo" className="w-50" />
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
