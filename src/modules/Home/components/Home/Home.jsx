import React from "react";
import Header from "../../../Shared/components/Header/Header";
import headerBg from "../../../../assets/images/header.png";

export default function Home() {
  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Welcome Upskilling!"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div>Home</div>
    </>
  );
}
