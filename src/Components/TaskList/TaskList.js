import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { URL, GET_TASK } from "../../Axios/Api";
import { Link } from "react-router-dom";
import Loader from "../../Layouts/Loader";

const TaskList = () => {
  const [modalData, setModalData] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    let auth_check = JSON.parse(localStorage.getItem("user"));
    const token = auth_check.access_token || null;
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    await axios
      .get(URL + GET_TASK)
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }, []);
  function handleEdit(id) {
    axios
      .get(URL + GET_TASK + "/" + id)
      .then((response) => {
        console.log(response.data.task);
        setModalData(response.data.task);
      })
      .catch((error) => {
        Helper.alertMessage("error", error);
      });
  }
  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }
  return (
    <div className="card-box mb-30">
      <div className="pd-20">
        <h4 className="text-blue h4">Task List Table</h4>
        <p className="mb-0">Here you can update and delete tasks.</p>
      </div>
      <div className="pb-20">
        <div className="mb-4 row">
          <div className="col-md-4 text-end pb-2 ml-2">
            <input
              type="search"
              id="searchInput"
              onKeyUp={Helper.tableSearch}
              placeholder="Search Anything"
              className="form-control"
            />
          </div>
        </div>
        <div className="table-responsive">
          <table id="myTable" className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>SL.</th>
                <th>Task Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {console.log(formData)}
              {formData &&
                formData.map((data, index) => (
                  <tr>
                    <td> {index + 1}</td>
                    <td> {data.title}</td>
                    <td> {moment(data.time).format("MMMM D, yyyy")}</td>
                    <td> {data.status}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(data.id)}
                        className="btn btn-info btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ padding: "3px 3px", margin: "2px" }}
                      >
                        <i
                          className="micon dw dw-edit"
                          style={{ padding: "3px 3px", margin: "2px" }}
                        ></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        style={{ padding: "3px 3px", margin: "2px" }}
                      >
                        <i
                          className="micon dw dw-trash"
                          style={{ padding: "3px 3px", margin: "2px" }}
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="false"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Warehouse
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          // value={formData.name || ""}
                          name="name"
                          id="name"
                          // onChange={onChangeInput}
                          aria-describedby="name"
                        />
                        <div className="mb-3">
                          <label htmlFor="post_code" className="form-label">
                            Post Code *
                          </label>
                          <input
                            type="post_code"
                            name="post_code"
                            // value={formData.post_code || ""}
                            className="form-control"
                            // onChange={onChangeInput}
                            id="post_code"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="area" className="form-label">
                            Area *
                          </label>
                          <input
                            type="area"
                            name="area"
                            className="form-control"
                            // value={formData.area || ""}
                            // onChange={onChangeInput}
                            id="area"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
