import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { URL, SHOW_TASK, UPDATE_TASK } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";
import Loader from "../../Layouts/Loader";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

const UpdateTask = (props) => {
  const { id } = props.match.params;
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [subTaskData, setSubTaskData] = useState([]);
  const [status, setStatus] = useState("");
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
    await axios
      .get(URL + SHOW_TASK + "/" + id)
      .then((response) => {
        console.log(response.data.task);
        setTitle(response.data.task.title);
        setTime(new Date(response.data.task.time));
        setStatus(response.data.task.status);
        setSubTaskData(response.data.task.subtask);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }, []);
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
        time: time,
        status: status,
      })
      .then((res) => {
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
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 mb-20 pt-5">
            <button type="submit" class="btn btn-primary me-1 mb-1 ml-2">
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
