import React, { useState } from "react";
import { URL, UPDATE_PASSWORD } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";
import axios from "axios";

const UserPassword = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(URL + UPDATE_PASSWORD, {
        email: email,
        password: password,
      })
      .then((res) => {
        setEmail(null);
        setPassword(null);

        props.history.push("/dashboard");
        if (res.data.status) {
          Helper.alertMessage("success", "Successfully Updated");
        } else {
          Helper.alertMessage("error", "User Email Not Found");
        }
      })
      .catch(function (res) {
        Helper.alertMessage("error", res);
      });
  }
  return (
    <>
      <div>
        <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src="vendors/images/forgot-password.png"
                  alt="forgot-password"
                />
              </div>
              <div className="col-md-6">
                <div className="login-box bg-white box-shadow border-radius-10">
                  <div className="login-title">
                    <h2 className="text-center text-primary">
                      Reset User Password
                    </h2>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-group custom">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="input-group-append custom">
                        <span className="input-group-text">
                          <i className="icon-copy dw dw-user1" />
                        </span>
                      </div>
                    </div>
                    <div className="input-group custom">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="New Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-append custom">
                        <span className="input-group-text">
                          <i className="dw dw-padlock1" />
                        </span>
                      </div>
                    </div>

                    <div className="row align-items-center">
                      <div className="col-5">
                        <div className="input-group mb-0">
                          {/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Submit">
										*/}
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPassword;
