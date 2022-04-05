import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Calendar = () => {
  const [schedule, setSchedule] = useState(new Date());
  return (
    <div className="form-group row mt-3">
      <div className="display-inline-block col-8 col-md-4 col-lg-4">
        <div className="form-control" style={{ display: "flex" }}>
          <i className="fa fa-calendar mt-2 mr-2 "></i>
          <DatePicker
            selected={schedule}
            onChange={(date) => setSchedule(date)}
            dateFormat="YYYY-MM-DD"
            className="form-control "
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
  );
};

export default Calendar;
