import React from "react";
import Header from "../../../Shared/components/Header/Header";
import headerBg from "../../../../assets/images/home-avatar.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Welcome Upskilling!"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="home-data py-4 px-5 my-3 d-flex justify-content-between align-items-center">
        <div className="home-title">
          <h5>
            Fill the <span className="text-success">Recipes !</span>
          </h5>
          <p>
            you can now fill the meals easily using the table and form , click{" "}
            <br />
            here and sill it with the table !
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/recipesList")}
          className="btn btn-success"
        >
          Fill Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
