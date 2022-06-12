import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { URL, DATE_TASK } from "../../Axios/Api";

import Loader from "../../Layouts/Loader";
import DatePicker from "react-datepicker";
// import "./dashboard.css"
import "react-datepicker/dist/react-datepicker.css";
const Dashboard = () => {
  const [schedule, setSchedule] = useState(new Date());
  const [taskData, setTaskData] = useState(null);
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

      .post(URL + DATE_TASK, {
        date: moment(schedule).format("yyyy-MM-DD"),
      })
      .then((res) => {
        console.log(res.data.subtask);
        setTaskData(res.data.subtask);
        setLoading(false);
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();

    axios
      .post(URL + DATE_TASK, {
        date: moment(schedule).format("yyyy-MM-DD"),
      })
      .then((res) => {
        setTaskData(res.data.data);
        setLoading(false);
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
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
    // <div className="container-fluid img-wrapper bg-danger">
    <>
      <div className="pd-20 card-box mb-30">
        <div className="form-group row mt-3">
          <div className="display-inline-block col-8 col-md-4 col-lg-4">
            <div className="title mb-4">
              <h4>Calendar</h4>
            </div>

            <div
              className="form-control"
              style={{
                display: "flex",
                padding: "0px",
              }}
            >
              <i className="fa fa-calendar ml-1 mt-3 mr-1 "></i>
              <DatePicker
                selected={schedule}
                onChange={(date) => setSchedule(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
              />
              <button
                type="submit"
                className="btn btn-primary waves-effect waves-light me-6"
                onClick={(e) => handleClick(e)}
                style={{ padding: "0px 8px", margin: "1px 2px" }}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-height-200px">
        <div className="container pd-0">
          <div className="timeline mb-30">
            <ul>
              {taskData &&
                taskData.map((subtask, index) => (
                  <li key={index}>
                    {console.log(subtask.task[0].title)}
                    <div className="timeline-date">Subtask {index + 1}</div>
                    <div className="timeline-desc card-box">
                      <div className="card table-card">
                        <div
                          className="card-header "
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="display-inline-block">
                            <h4 className="mb-10 mt-3 h4">
                              {subtask.task[0].title}
                            </h4>
                          </div>
                          <button
                            type="button mt-3"
                            className={
                              subtask.task[0].status === "Done"
                                ? "btn btn-success"
                                : subtask.task[0].status === "In Progress"
                                ? "btn btn-warning"
                                : "btn btn-secondary"
                            }
                          >
                            {subtask.task[0].status}
                          </button>
                        </div>
                        <div className="card-block">
                          <div className="profile-timeline-list ml-5">
                            <ul>
                              <li>
                                <div className="date">{subtask.time}</div>
                                <div className="task-name">
                                  <i className="ion-ios-clock" />{" "}
                                  {subtask.title}
                                </div>
                                <div className="task-time mt-3 ">
                                  {/* <select className="btn btn-sm btn-info"> */}
                                  <button className="btn btn-sm btn-info">
                                    {subtask.status === "0"
                                      ? "Not Done"
                                      : subtask.status === "1"
                                      ? "Done"
                                      : "Null"}
                                  </button>
                                  {/* </select> */}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
    // </div>
  );
};

export default Dashboard;
