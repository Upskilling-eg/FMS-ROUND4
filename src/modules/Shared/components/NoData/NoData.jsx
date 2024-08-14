import React from "react";
import noData from "../../../../assets/images/no-data.png";

export default function NoData() {
  return (
    <div className="text-center">
      <img src={noData} alt="" />

      <h5>No Data !</h5>
    </div>
  );
}
