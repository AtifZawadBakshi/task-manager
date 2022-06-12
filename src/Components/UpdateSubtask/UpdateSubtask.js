import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { URL, SHOW_SUBTASK, UPDATE_SUBTASK } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";
import Loader from "../../Layouts/Loader";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Swal from "sweetalert2";

const UpdateSubtask = (props) => {
  const { id } = props.match.params;
  const history = useHistory();
  const [selectedTask, setSelectedTask] = useState(0);
  const [subTaskData, setSubTaskData] = useState(null);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [timePlaceHolder, setTimeHolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  let statusOption = [
    { label: "Not Done", value: "0" },
    { label: "Done", value: "1" },
  ];
  // let timePlaceholder;
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
      .get(URL + SHOW_SUBTASK + "/" + id)
      .then((response) => {
        console.log(response.data.subTask);
        setSelectedTask(response.data.subTask.task_id);
        setSubTaskData(response.data.subTask);
        setTitle(response.data.subTask.title);
        setStatus(response.data.subTask.status);
        setTimeHolder(response.data.subTask.time);
        setDate(new Date(response.data.subTask.date));
        // timePlaceholder = response.data.subTask.time;
        // setTime(response.data.subTask.time);
        // console.log(response.data.subTask.time);
        // console.log(moment(response.data.subTask.time).format("h:mm aa"));
        setLoading(false);
      })
      .catch(function (error) {
        Helper.alertMessage("error", error);
      });
  }, []);

  const statusHandler = (value) => {
    setStatus(value.value);
  };

  function handleSubtaskSubmit(e) {
    e.preventDefault();
    console.log("title: ", title);
    console.log("task_id: ", selectedTask);
    console.log("date: ", date);
    console.log("time: ", time);
    if (time !== null) {
      axios
        .put(URL + UPDATE_SUBTASK + "/" + id, {
          title: title,
          task_id: selectedTask,
          date: moment(date).format("yyyy-MM-DD"),
          time: moment(time).format("HH:mm"),
          status: status,
        })
        .then((res) => {
          history.goBack();
          Helper.alertMessage("success", "Successfully Updated");
        })
        .catch(function (res) {
          Helper.alertMessage("error", res);
        });
    } else {
      axios
        .put(URL + UPDATE_SUBTASK + "/" + id, {
          title: title,
          task_id: selectedTask,
          date: moment(date).format("yyyy-MM-DD"),
          time: timePlaceHolder,
          status: status,
        })
        .then((res) => {
          history.goBack();
          Helper.alertMessage("success", "Successfully Updated");
        })
        .catch(function (res) {
          Helper.alertMessage("error", res);
        });
    }
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
      <div className="clearfix">
        <div className="pull-left">
          <h4 className="text-blue h4 mb-4">Update Subtask</h4>
        </div>
      </div>
      <form onSubmit={(e) => handleSubtaskSubmit(e)}>
        {/* <div className="form-group">
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
        </div> */}
        <div className="form-group">
          <label>
            Subtask Title<span style={{ color: "red" }}>*</span>
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
            selected={date}
            onChange={(res) => setDate(res)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Time<span style={{ color: "red" }}>*</span>
          </label>
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
            placeholderText={timePlaceHolder}
          />
          {/* <TimePicker
            //   value={timeVal}
            onChange={(time) => setTimeVal(time)}
            className="form-control"
          /> */}
        </div>

        <div className="form-group">
          <label>
            Status<span style={{ color: "red" }}>*</span>
          </label>
          <Select
            options={statusOption}
            onChange={statusHandler}
            defaultValue={status === "0" ? statusOption[0] : statusOption[1]}
          />
        </div>

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
    </>
  );
};

export default UpdateSubtask;
