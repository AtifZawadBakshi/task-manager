import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PreLoader from "../../Layouts/PreLoader";
import axios from "axios";
import ReactDOM from "react-dom";
// import "./createtask.css";
const CreateTask = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    setFormData({
      ...formData,
    });
    console.log(formData);
  }
  return (
    <>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="text-blue h4 mb-4">Assign Task</h4>
            {/* <p className="mb-30">All bootstrap element classies</p> */}
          </div>
          {/* <div className="pull-right">
          <a
            href="#horizontal-basic-form1"
            className="btn btn-primary btn-sm scroll-click"
            rel="content-y"
            data-toggle="collapse"
            role="button"
          >
            <i className="fa fa-code" /> Source Code
          </a>
        </div> */}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              className="form-control"
              type="text"
              name=""
              placeholder="Input Title"
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              className="form-control date-picker"
              placeholder="Select Date"
              name=""
              type="text"
              onChange={onChangeInput}
            />
          </div>
          <div className="col-12 d-flex justify-content-center mt-4 mb-20 pt-5">
            <button type="submit" class="btn btn-primary me-1 mb-1 ml-2">
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

export default CreateTask;
