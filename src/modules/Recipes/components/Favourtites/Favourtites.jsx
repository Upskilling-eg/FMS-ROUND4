import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BASE_IMG_URL,
  USER_RECIPES_URLS,
} from "../../../../constants/END_POINTS";
import NoData from "../../../Shared/components/NoData/NoData";
import headerBg from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";

export default function Favourtites() {
  const [favList, setFavList] = useState([]);

  let getFavList = async () => {
    try {
      let response = await axios.get(USER_RECIPES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);

      setFavList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let removeFromFav = async (id) => {
    try {
      let response = await axios.delete(USER_RECIPES_URLS.removeFromFav(id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      getFavList()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFavList();
  }, []);

  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Favourite Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      {favList.length > 0 ? (
        <div className="container">
          <div className="row">
            {favList.map((fav) => (
              <div key={fav.id} className="col-md-4 my-3">
                <div className="recipe">
                  <img
                    className="img-fluid"
                    src={`${BASE_IMG_URL}/${fav.recipe.imagePath}`}
                    alt=""
                  />
                  <h3>{fav.recipe.name}</h3>
                  <p>{fav.recipe.description}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromFav(fav.id)}
                  >
                    remove from fav
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
