import React from "react";
import noData from "../../../../assets/images/no-data.png";

export default function DeleteConfirmation({ deleteItem }) {
  return (
    <div className="modalBody text-center">
      <img src={noData} alt="" />
      <h5 className="my-3">Delete this {deleteItem}?</h5>
      <span className="text-muted">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </span>
    </div>
  );
}
