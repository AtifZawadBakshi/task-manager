import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import * as Helper from "../../Layouts/Helper";
import { URL, GET_TASK } from "../../Axios/Api";
import { Link } from "react-router-dom";
import Loader from "../../Layouts/Loader";

const CreateSubtask = () => {
  let [formData, setFormData] = useState({});
  return (
    <>
      <div className="pd-20 card-box mb-30">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="text-blue h4">Assign Subtask Under Task</h4>
          </div>
        </div>

        <form>
          <div className="form-group">
            <label>Main Task</label>
            <select
              className="mdb-select md-form form-control"
              searchable="Search here.."
            >
              <option value disabled selected>
                Choose your country
              </option>
              <option value={1}>USA</option>
              <option value={2}>Germany</option>
              <option value={3}>France</option>
              <option value={3}>Poland</option>
              <option value={3}>Japan</option>
            </select>

            <select
              className="custom-select2 form-control"
              searchable="Search here.."
              style={{ width: "100%", height: "38" }}
            >
              <option value="">Select Main Task</option>
              <option value="Amsterdam">India</option>
              <option value="Berlin">UK</option>
              <option value="Frankfurt">US</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subtask Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Input Title"
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              className="form-control time-picker"
              placeholder="Select time"
              type="text"
            />
          </div>
        </form>
      </div>
      <div className="col-12 d-flex justify-content-center mt-4 mb-20">
        <button type="button" class="btn btn-primary me-1 mb-1 ml-2">
          Assign
        </button>
        <button type="reset" className="btn btn-info me-1 mb-1 ml-2">
          Reset
        </button>
      </div>
    </>
  );
};

export default CreateSubtask;
