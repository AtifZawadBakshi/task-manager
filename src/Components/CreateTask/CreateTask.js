import React, { useEffect, useState } from "react";
import { URL, STORE_TASK } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTask = (props) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  useEffect(() => {
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
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(URL + STORE_TASK, {
        title: title,
        time: time,
        status: "Not Touched",
      })
      .then((res) => {
        props.history.push("/create-subtask");
        Helper.alertMessage("success", "Successfully Added");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  function handleReset() {
    setTitle(null);
    setTime(new Date());
  }

  return (
    <>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="text-blue h4 mb-4">Assign Task</h4>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Type Task Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
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
              Assign
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-info me-1 mb-1 ml-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
