import React from "react";
import { useForm } from "react-hook-form";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const appendToFormData = (data) => {
    //form data =< data
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  let onSubmit = async (data) => {
    let registerData = appendToFormData(data);
    try {
      let response = await axios.post(USERS_URLS.register, registerData);
      // toast.success(response.data.message);
      navigate("/verify-account");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h4>Register</h4>
      <span className="text-muted">
        Welcome Back! Please enter your details
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="UserName"
                  aria-label="userName"
                  aria-describedby="basic-addon1"
                  {...register("userName", {
                    required: "username is required",
                  })}
                />
              </div>
              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E-mail"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("email", EmailValidation)}
                />
              </div>
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  aria-label="userName"
                  aria-describedby="basic-addon1"
                  {...register("country", { required: "Country is required" })}
                />
              </div>
              {errors.country && (
                <span className="text-danger">{errors.country.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("phoneNumber", {
                    required: "phoneNumber is required",
                  })}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-danger">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  {...register("password", PasswordValidation)}
                />
              </div>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", PasswordValidation)}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <input
                  type="file"
                  className="form-control"
                  placeholder="image"
                  aria-label="image"
                  aria-describedby="basic-addon1"
                  {...register("profileImage", {
                    required: "image is required",
                  })}
                />
              </div>
              {errors.profileImage && (
                <span className="text-danger">
                  {errors.profileImage.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-success w-75">Register</button>
        </div>
      </form>
    </div>
  );
}
