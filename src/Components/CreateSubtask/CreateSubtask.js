import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { URL, STORE_SUBTASK, GET_TASK } from "../../Axios/Api";
import Loader from "../../Layouts/Loader";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const CreateSubtask = (props) => {
  let [formData, setFormData] = useState({});
  const [selectedTask, setSelectedTask] = useState(0);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [title, setTitle] = useState("");
  // const [options, setOptions] = useState([]);
  let options = [];
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
        setFormData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }, []);

  const pushArray = (title, id) => {
    console.log(title);
    console.log(id);
    options.push({ label: title, value: id });
    // setOptions([...options, { label: title, value: id }]);
    // let tempArray = [...options, { label: title, value: id }];
    console.log(options);
    // setOptions(tempArray);
  };

  const userIdHandler = (value) => {
    console.log(value);
    setSelectedTask(value.value);
  };

  function handleSubmit() {
    axios
      .post(URL + STORE_SUBTASK, {
        title: title,
        date: moment(date).format("yyyy-MM-DD"),
        time: moment(time).format("HH:mm"),
        task_id: selectedTask,
        status: "0",
      })
      .then((response) => {
        props.history.push("/dashboard");
        Helper.alertMessage("success", "Successfully Added Subtask");
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  function handleReset() {
    setTitle(null);
    setTime(new Date());
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
            {formData.map((data, index) => pushArray(data.title, data.id))}
            <Select
              options={options}
              onChange={userIdHandler}
              placeholder="Select Main Task"
            />
            {/* <select
              className="form-control select2"
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
            </select> */}
          </div>
          <div className="form-group">
            <label>Subtask Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Type Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <DatePicker
              minDate={new Date()}
              selected={date}
              onChange={(res) => setDate(res)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select Date"
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <DatePicker
              className="form-control"
              selected={time}
              onChange={(res) => setTime(res)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              placeholderText="Select Time"
            />
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 mb-20">
            <button
              type="button"
              className="btn btn-primary me-1 mb-1 ml-2"
              onClick={handleSubmit}
            >
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

export default CreateSubtask;
