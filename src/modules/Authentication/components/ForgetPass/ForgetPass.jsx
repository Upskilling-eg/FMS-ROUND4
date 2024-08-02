import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../auth.module.css";
import { USERS_URLS } from "../../../../constants/END_POINTS";

export default function ForgetPass() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  let onSubmit = async (data) => {
    try {
      let response = await axios.post(USERS_URLS.resetRequest, data);
      console.log(response);
      toast.success("OTP is sent to your account");
      navigate("/resetPass");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
          <h3 className="">Request Reset Password</h3>
          <p>Please enter your email and check your inbox</p>
        </div>
        <div className="mb-5">
          <div className="input-group ">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </span>
            <input
              type="email"
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

        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3"
          disabled={isSubmitting}
        >
          Reset Request
        </button>
      </form>
    </>
  );
}
