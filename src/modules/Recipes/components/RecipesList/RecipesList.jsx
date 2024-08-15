import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerBg from "../../../../assets/images/header.png";
import {
  BASE_IMG_URL,
  CATEGORIES_URLS,
  GETALLTAGS,
  RECIPES_URLS,
} from "../../../../constants/END_POINTS";
import axios from "axios";
import NoData from "../../../Shared/components/NoData/NoData";
import noData from "../../../../assets/images/no-data.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useRecipesParams from "./useRecipesParams";
export default function RecipesList() {
  let navigate = useNavigate();
  const [receipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

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

  let deleteRecipe = async () => {
    try {
      let response = await axios.delete(RECIPES_URLS.delete(recipeId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("deleted succefully");
      console.log(response);
      getRecipesList();
      handleClose();
    } catch (error) {
      // toast.success("deleted m7sl4");
      console.log(error);
    }
  };
  let getRecipesList = async ({
    pageSize = 5,
    pageNumber = 1,
    name = "",
    tagId = "",
    categoryId = "",
  } = {}) => {
    try {
      let response = await axios.get(RECIPES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTags();
    getCategoriesList();
  }, []);

  const { recipesParams, updateParams } = useRecipesParams();
  React.useEffect(() => {
    getRecipesList();
  }, [recipesParams]);

  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Recipe"}></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="title p-4 d-flex justify-content-between align-items-center">
        <div className="title-info">
          <h4>Recipes Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button
          className="btn btn-success"
          onClick={() => navigate("/dashboard/recipe-data")}
        >
          Add new recipe
        </button>
      </div>

      <div className="table-container p-3">
        <div className="row">
          <div className="col-md-6">
            <input
              value={recipesParams.name}
              onChange={(e) => updateParams({ name: e.target.value })}
              type="text"
              placeholder="Search by Name.."
              className="form-control mb-3"
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={recipesParams.tagId}
              onChange={(e) => updateParams({ tagId: e.target.value })}
            >
              <option disabled>select tag</option>
              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={recipesParams.categoryId}
              onChange={(e) => updateParams({ categoryId: e.target.value })}
            >
              <option disabled>select category</option>

              {CategoriesList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {receipesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {receipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.name}</th>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        className="img-list"
                        src={`${BASE_IMG_URL}/${recipe.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img className="img-list" src={noData} />
                    )}
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>

                  <td>
                    <i
                      className="fa fa-edit text-warning mx-3"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleShow(recipe.id)}
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNumber) => (
            <li
              key={pageNumber}
              className="page-item"
              onClick={() => updateParams({ pageNumber })}
            >
              <a className="page-link">{pageNumber}</a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
