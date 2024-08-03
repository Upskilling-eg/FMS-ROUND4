import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../auth.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { useNavigate } from "react-router-dom";
import { EmailValidation } from "../../../../constants/VALIDATIONS";

export default function ForgetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("hello");
    try {
      let response = await axios.post(USERS_URLS.resetRequest, data);
      console.log(response);
      toast.success(response?.data?.message || "OTP is sent to your account");
      navigate("/reset-password");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  console.log({ errors });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class={styles["form-header"]}>
          <h3>Request Reset Password</h3>
          <p>Welcome Back! Please Enter your details</p>
        </div>
        <div className="input-group mb-3">
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

        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3"
          disabled={isSubmitting}
        >
          Request Reset
        </button>
      </form>
    </>
  );
}
