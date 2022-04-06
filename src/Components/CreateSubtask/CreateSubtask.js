import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { Link } from "react-router-dom";
import Loader from "../../Layouts/Loader";
import TimePicker from "react-time-picker";
import { URL, STORE_SUBTASK, GET_TASK } from "../../Axios/Api";

const CreateSubtask = (props) => {
  let [formData, setFormData] = useState({});
  const [value, onChange] = useState();
  const [selectedTask, setSelectedTask] = useState(0);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    axios

      .post(URL + STORE_SUBTASK, {
        title: title,
        time: value,
        task_id: selectedTask,
      })
      .then((res) => {
        props.history.push("/dashboard");
        Helper.alertMessage("success", "Successfully Added");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  function handleReset() {
    setTitle(null);
    onChange(null);
  }

  if (loading) {
    return (
      <section className="section loading">
        <Loader />
      </section>
    );
  }
  return (
    <>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="text-blue h4">Assign Subtask Under Task</h4>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label>Main Task</label>

            <select
              className="custom-select2 form-control"
              searchable="Search here.."
              value={selectedTask}
              style={{ width: "100%", height: "38" }}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              <option value="">Select Main Task</option>
              {formData.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Subtask Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Type Title"
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <TimePicker
              onChange={onChange}
              value={value}
              className="form-control"
            />
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 mb-20">
            <button type="button" class="btn btn-primary me-1 mb-1 ml-2">
              Assign
            </button>
            <button type="reset" className="btn btn-info me-1 mb-1 ml-2">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSubtask;
