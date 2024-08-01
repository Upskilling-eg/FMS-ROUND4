import React from "react";
import Header from "../../../Shared/components/Header/Header";
import headerBg from "../../../../assets/images/Envelope-br.png";

export default function RecipesList() {
  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div>RecipesList</div>
    </>
  );
}
