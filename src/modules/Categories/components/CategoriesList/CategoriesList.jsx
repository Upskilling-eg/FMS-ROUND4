import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerBg from "../../../../assets/images/header.png";

import axios from "axios";
import { CATEGORIES_URLS } from "../../../../constants/END_POINTS";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../../../Shared/components/NoData/NoData";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [CategoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [nameValue, setNameValue] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };
  let deleteCategory = async () => {
    try {
      let response = await axios.delete(CATEGORIES_URLS.delete(catId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("deleted succefully");
      console.log(response);
      getCategoriesList();
      handleClose();
    } catch (error) {
      // toast.success("deleted m7sl4");
      console.log(error);
    }
  };
  let getCategoriesList = async (pageNo, pageSize, nameInput) => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: pageSize, pageNumber: pageNo, name: nameInput },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let addCategory = async (data) => {
    try {
      let response = await axios.post(CATEGORIES_URLS.create, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      handleAddClose();
      getCategoriesList();
    } catch (error) {
      console.log(error);
    }
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoriesList(1, 3, input.target.value);
  };

  useEffect(() => {
    getCategoriesList(1, 3, "");
  }, []);

  return (
    <>
      <Header
        imgUrl={headerBg}
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Category"}></DeleteConfirmation>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(addCategory)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name "
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className=" text-danger">{errors.name.message}</p>
            )}

            <button className="btn btn-success">Save</button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="title p-4 d-flex justify-content-between align-items-center">
        <div className="title-info">
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success" onClick={handleAddShow}>
          Add new category
        </button>
      </div>
      <div className="table-container p-3">
        <input
          type="text"
          placeholder="Search by Name.."
          className="form-control mb-3"
          onChange={getNameValue}
        />
        {CategoriesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {CategoriesList.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-3"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleShow(category.id)}
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
          {arrayOfPages.map((pageNo) => (
            <li
              key={pageNo}
              className="page-item"
              onClick={() => getCategoriesList(pageNo, 3)}
            >
              <a className="page-link">{pageNo}</a>
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
