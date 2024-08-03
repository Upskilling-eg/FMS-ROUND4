import React from "react";
import logo from "../../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../auth.module.css";
import { EmailValidation } from "../../../../constants/VALIDATIONS";
export default function Login({ saveLoginData }) {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class={styles["form-header"]}>
          <h3>Log In</h3>
          <p>Welcome Back! Please Enter your details</p>
        </div>
        <div className="mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", EmailValidation)}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-key" aria-hidden="true"></i>
            </span>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onMouseUp={(e) => {
                e.preventDefault();
              }}
              type="button"
              className="input-group-text"
              id="basic-addon1"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              <span className="sr-only">
                {isPasswordVisible ? "hide Password" : "Show Password"}
              </span>
              <i
                className={`fa ${
                  isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="links d-flex justify-content-between">
          <Link className="text-muted text-decoration-none">Register Now?</Link>
          <Link
            to="/forget-password"
            className="text-success text-decoration-none"
          >
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn btn-success d-block w-100 my-3">
          Login
        </button>
      </form>
    </>
  );
}
