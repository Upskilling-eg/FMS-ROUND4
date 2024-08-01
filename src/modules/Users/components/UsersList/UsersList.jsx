import React from "react";
import headerBg from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";

export default function UsersList() {
  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div>users</div>
    </>
  );
}
