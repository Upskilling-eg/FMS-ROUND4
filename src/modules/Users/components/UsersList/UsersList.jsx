import React from "react";

import headerBg from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";
import { paginate } from "../../../../helpers";

export default function UsersList() {
  const [count, setCount] = React.useState(0);

  const getRecipes = React.useCallback(() => {
    console.log("api call to the recipes api");
  }, []);

  React.useEffect(() => {
    getRecipes();
  }, [getRecipes]);
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

      <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>
    </>
  );
}
