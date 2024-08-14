import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EmailValidation } from "../../../../constants/VALIDATIONS";
import styles from "../../auth.module.css";
import axios from "axios";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSubmit = async (data) => {
    try {
      let response = await axios.put(USERS_URLS.verify, data);
      toast.success(reponse.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
          <h3>Verify Account</h3>
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
              placeholder="Code"
              aria-label="code"
              aria-describedby="basic-addon1"
              {...register("code", {
                required: "code is required",
              })}
            />
          </div>
          {errors.code && (
            <span className="text-danger">{errors.code.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-success d-block w-100 my-3">
          Verify
        </button>
      </form>
    </>
  );
}
