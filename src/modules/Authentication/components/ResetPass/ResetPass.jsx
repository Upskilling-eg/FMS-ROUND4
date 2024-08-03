import React from "react";
import { useNavigate } from "react-router-dom";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styles from "../../auth.module.css";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";
import axios from "axios";
export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(USERS_URLS.reset, data);
      console.log(response);
      toast.success(response?.data?.message || "Password reset successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class={styles["form-header"]}>
        <h3>Reset Password</h3>
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
            type="text"
            className="form-control"
            placeholder="OTP"
            aria-label="OTP"
            aria-describedby="basic-addon1"
            {...register("seed", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.seed && (
          <span className="text-danger">{errors.seed.message}</span>
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
            {...register("password", PasswordValidation)}
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
              className={`fa ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
            ></i>
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
            type={isPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Confirm Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
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
              className={`fa ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-success d-block w-100 my-3"
        disabled={isSubmitting}
      >
        Reset Password
      </button>
    </form>
  );
}
