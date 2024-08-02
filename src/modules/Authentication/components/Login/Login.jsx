import React from "react";
import logo from "../../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email should be valid mail",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <button className="input-group-text" type="button">
            <span className="sr-only">Show Password</span>
            <i className="fa fa-eye" aria-hidden="true" />
          </button>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
        <div className="links d-flex justify-content-between">
          <Link className="text-muted text-decoration-none">Register Now?</Link>
          <Link to="/forgetPass" className="text-success text-decoration-none">
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
