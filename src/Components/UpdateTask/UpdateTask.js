import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { URL, SHOW_TASK, UPDATE_TASK, DELETE_SUBTASK } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";
import Loader from "../../Layouts/Loader";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Swal from "sweetalert2";
const UpdateTask = (props) => {
  const { id } = props.match.params;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [taskData, setTaskData] = useState(null);
  const [subTaskData, setSubTaskData] = useState([]);
  const [status, setStatus] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [subTitle, setSubTitle] = useState([]);
  const [timeVal, setTimeVal] = useState([]);

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
    SubTaskLists();
  }, []);

  function SubTaskLists() {
    axios
      .get(URL + SHOW_TASK + "/" + id)
      .then((response) => {
        setTaskData(response.data.task);
        setTitle(response.data.task.title);
        setTime(new Date(response.data.task.time));
        setStatus(response.data.task.status);
        setSubTaskData(response.data.task.subtask);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }
  function deleteItem(id) {
    axios
      .delete(URL + DELETE_SUBTASK + "/" + id)
      .then((response) => {
        SubTaskLists();
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

  function handleTaskSubmit(e) {
    e.preventDefault();
    axios
      .put(URL + UPDATE_TASK + "/" + id, {
        title: title,
        // time: moment(time).format("yyyy-MM-DD"),
        status: status,
      })
      .then((res) => {
        history.goBack();
        SubTaskLists();
        // props.history.push("/task-list");
        Helper.alertMessage("success", "Successfully Added");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  return (
    <>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="text-blue h4 mb-4">Update Task Details</h4>
          </div>
        </div>
        <form onSubmit={(e) => handleTaskSubmit(e)}>
          <div className="form-group">
            <label>
              Task Title<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-control"
              type="text"
              value={title}
              placeholder="Type Task Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Task Status</label>
            <input
              className="form-control"
              type="text"
              placeholder={status}
              disabled
            />
          </div>
          {/* <div className="form-group">
            <label>
              Date<span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              minDate={new Date()}
              selected={time}
              onChange={(date) => setTime(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div> */}
          <div className="col-12 d-flex justify-content-center mt-4 mb-20 pt-2 pb-5">
            <button type="submit" className="btn btn-primary me-1 mb-1 ml-2">
              Update
            </button>
            <button
              type="reset"
              onClick={() => history.goBack()}
              className="btn btn-info me-1 mb-1 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table id="myTable" className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>SL.</th>
                <th>Subtask Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subTaskData &&
                subTaskData.map((data, index) => (
                  <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {data.title}</td>
                    <td> {data.date}</td>
                    <td> {data.time}</td>
                    <td>{data.status !== "0" ? "Done" : "Not Done"}</td>
                    <td>
                      <Link
                        to={"/update-subtask/" + data.id}
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
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.value) {
                              return deleteItem(data.id);
                            }
                          });
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

        {/* {subTaskData &&
          subTaskData.map((subtask, index) => {
            setSubTitle(...subTitle, subtask.title);
            setTimeVal(...timeVal, subtask.time);
            return (
              <>
                <div className="clearfix">
                  <div className="pull-left">
                    <h4 className="text-blue h4 mb-4">
                      Update Subtask {index + 1}
                    </h4>
                  </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>
                      Subtask Title<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={subTitle}
                      placeholder="Type Task Title"
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Time<span style={{ color: "red" }}>*</span>
                    </label>
                    <TimePicker
                      value={timeVal}
                      onChange={(time) => setTimeVal(time)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-4 mb-20 pt-5">
                    <button
                      type="submit"
                      class="btn btn-primary me-1 mb-1 ml-2"
                    >
                      Update
                    </button>
                    <button
                      type="reset"
                      //   onClick={handleReset}
                      className="btn btn-info me-1 mb-1 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            );
          })} */}
      </div>
    </>
  );
};

export default UpdateTask;
