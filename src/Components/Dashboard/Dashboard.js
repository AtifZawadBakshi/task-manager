import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";

const Dashboard = () => {
  const [schedule, setSchedule] = useState(new Date());
  return (
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
                // onClick={(e) => handleSubmit(e)}
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
              <li>
                <div className="timeline-date">Task 1</div>
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
                        <h4 className="mb-10 mt-3 h4">Task Title 1</h4>
                      </div>
                      <button type="button mt-3" class="btn btn-success">
                        Completed
                      </button>
                    </div>
                    <div className="card-block">
                      <div className="profile-timeline-list ml-5">
                        <ul>
                          <li>
                            <div className="date">09:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 1
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">12:30 pm</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 2
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">03:30 pm</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 3
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-date">Task 2</div>
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
                        <h4 className="mb-10 mt-3 h4">Task Title 2</h4>
                      </div>
                      <button type="button mt-3" class="btn btn-secondary">
                        Not Touched
                      </button>
                    </div>
                    <div className="card-block">
                      <div className="profile-timeline-list ml-5">
                        <ul>
                          <li>
                            <div className="date">09:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 1
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">11:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 2
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">02:30 pm</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 3
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-date">Task 3</div>
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
                        <h4 className="mb-10 mt-3 h4">Task Title 3</h4>
                      </div>
                      <button type="button mt-3" class="btn btn-warning">
                        In Progress
                      </button>
                    </div>
                    <div className="card-block">
                      <div className="profile-timeline-list ml-5">
                        <ul>
                          <li>
                            <div className="date">09:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 1
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">09:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 2
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                          <li>
                            <div className="date">09:30 am</div>
                            <div className="task-name">
                              <i className="ion-ios-clock" /> Sub Task 3
                            </div>
                            <div className="task-time mt-3 ">
                              <select className="btn btn-sm btn-info">
                                <option>Not Done</option>
                                <option value="Picked">Done</option>
                              </select>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
