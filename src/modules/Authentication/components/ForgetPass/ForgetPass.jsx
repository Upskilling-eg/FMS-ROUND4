import React from "react";

export default function ForgetPass() {
  //move then improve
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white px-5 py-3 rounded rounded-2">
              <div className="">
                <div className="text-center">
                  {/* <img src={logo} alt="food-logo" className="w-50" /> */}
                </div>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-danger">
                    {errors.password.message}
                  </span>
                )}
                <div className="links d-flex justify-content-between">
                  <Link className="text-muted text-decoration-none">
                    Register Now?
                  </Link>
                  <Link
                    to="forgetPass"
                    className="text-success text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-success d-block w-100 my-3"
                >
                  Login
                </button>
              </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}