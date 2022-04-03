import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./date-picker.component.bootstrap.css";

function Calendar(props) {
  const buildClassNames = (touched, isInvalid) => {
    touched && isInvalid ? "form-control is-invalid" : "form-control";
  };

  const { setFieldValue, setFieldTouched, errors, touched } = props;
  const { name, value, label, ...rest } = props;

  return (
    <div className="form-group">
      <label className="datePickerLabel" htmlFor={name}>
        {label}
      </label>
      <DatePicker
        selected={value}
        onChange={(e) => {
          setFieldValue(name, e);
          setFieldTouched(name);
        }}
        className={buildClassNames(touched, !!errors)}
        customInput={<input type="text" id={name} placeholder={label} />}
        {...rest}
      />

      <div className="invalid-feedback">{errors}</div>
    </div>
  );
}
export default Calendar;
