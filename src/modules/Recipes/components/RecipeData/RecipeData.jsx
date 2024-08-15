import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CATEGORIES_URLS,
  GETALLTAGS,
  RECIPES_URLS,
} from "../../../../constants/END_POINTS";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";
import usebeforeUnload from "../../../../hooks/useBeforeUnload";

export default function RecipeData() {
  let {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  let navigate = useNavigate();
  const [tagsList, setTagsList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);

  let getCategoriesList = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getAllTags = async () => {
    try {
      let response = await axios.get(GETALLTAGS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const appendToFormData = (data) => {
    //form data =< data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);

    return formData;
  };

  let onSubmit = async (data) => {
    let recipeData = appendToFormData(data);
    try {
      let response = await axios.post(RECIPES_URLS.create, recipeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/dashboard/recipesList");
      toast.success(response.data.message);
      console.log(response);
      localStorage.removeItem("recipe-data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTagsAndCateories = async () => {
      await getAllTags();
      await getCategoriesList();

      const storedData = JSON.parse(localStorage.getItem("recipe-data"));
      reset(storedData);
    };

    getTagsAndCateories();
  }, []);

  // before un load
  // React.useEffect(() => {
  //
  //   window.addEventListener("beforeunload", beforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // }, []);

  const beforeUnload = React.useCallback((e) => {
    localStorage.setItem("recipe-data", JSON.stringify(getValues()));
  }, []);

  usebeforeUnload(beforeUnload);

  return (
    <>
      <div className="home-data py-4 px-5 my-3 d-flex justify-content-between align-items-center">
        <div className="home-title">
          <h5>
            Fill the <span className="text-success">Recipes !</span>
          </h5>
          <p>
            you can now fill the meals easily using the table and form , click
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

      <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Recipe Name"
          aria-label="name"
          aria-describedby="basic-addon1"
          {...register("name", { required: "name is required" })}
        />
        {errors.name && (
          <span className="text-danger">{errors.name.message}</span>
        )}
        <select
          className="form-control my-2"
          {...register("tagId", { required: "tag is required" })}
        >
          <option disabled>select tag</option>
          {tagsList.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagId && (
          <span className="text-danger">{errors.tagId.message}</span>
        )}

        <input
          type="text"
          className="form-control my-2"
          placeholder="Price"
          aria-label="price"
          aria-describedby="basic-addon1"
          {...register("price", { required: "price is required" })}
        />
        {errors.price && (
          <span className="text-danger">{errors.price.message}</span>
        )}
        <select
          className="form-control my-2"
          {...register("categoriesIds", { required: "category is required" })}
        >
          <option disabled>select category</option>

          {CategoriesList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoriesIds && (
          <span className="text-danger">{errors.categoriesIds.message}</span>
        )}
        <textarea
          placeholder="Description"
          className="form-control my-2"
          {...register("description", { required: "description is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}
        <input
          type="file"
          className="form-control my-2"
          placeholder="upload imgs"
          aria-label="price"
          aria-describedby="basic-addon1"
          {...register("recipeImage", { required: "recipeImage is required" })}
        />
        {errors.recipeImage && (
          <span className="text-danger">{errors.recipeImage.message}</span>
        )}
        <button
          className="btn btn-outline-success mx-3"
          type="button"
          onClick={() => {
            navigate(-1);
            localStorage.removeItem("recipe-data");
          }}
        >
          Cancel
        </button>
        <button className="btn btn-success">Save</button>
      </form>
    </>
  );
}
