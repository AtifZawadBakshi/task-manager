import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { URL, GET_TASK, DELETE_BOOKING } from "../../Axios/Api";
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

  function TaskLists() {
    axios
      .get(URL + GET_TASK)
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }
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
  function deleteItem(id) {
    axios
      .delete(URL + DELETE_BOOKING + "/" + id)
      .then((response) => {
        TaskLists();
        Helper.alertMessage("success", "Successfully Deleted");
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
                      <Link
                        to={"/update-task/" + data.id}
                        className="btn btn-info btn-sm"
                        style={{ padding: "3px 3px", margin: "2px" }}
                      >
                        <i
                          className="micon dw dw-edit"
                          style={{ padding: "3px 3px", margin: "2px" }}
                        ></i>
                      </Link>

                      <button
                        onClick={() => {
                          if (window.confirm("Delete the item?")) {
                            return deleteItem(data.id);
                          }
                        }}
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
    </div>
  );
};

export default TaskList;
