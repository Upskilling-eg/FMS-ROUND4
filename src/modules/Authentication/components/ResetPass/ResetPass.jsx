import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ResetPass() {
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
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <div className="mb-3">
        <div className="input-group mb-1">
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
      </div>
      <div className="mb-3">
        <div className="input-group mb-1">
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
      </div>

      <div className="mb-3">
        <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="basic-addon1"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />

          <button className="input-group-text" type="button">
            <span className="sr-only">Show Password</span>
            <i className="fa fa-eye" aria-hidden="true" />
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn-success d-block w-100 my-3">
        Reset password
      </button>
    </form>
  );
}
