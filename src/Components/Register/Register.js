import React, { useState } from "react";
import { URL, ADMIN_REGISTER, USER_REGISTER } from "../../Axios/Api";
import * as Helper from "../../Layouts/Helper";
import axios from "axios";

const Register = (props) => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [API, setAPI] = useState(null);

  function handleAdminClick() {
    setAPI(ADMIN_REGISTER);
  }

  function handleUserClick() {
    setAPI(USER_REGISTER);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios

      .post(URL + API, {
        name: name,
        phone: phone,
        email: email,
        password: password,
      })
      .then((res) => {
        window.location.reload(false);
        // props.history.push("/register");
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
    <div className="login-page">
      {/* <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <Link to="/">
              <img src="vendors/images/icon-light.png" alt />
            </Link>
          </div>
          <div className="login-menu">
            <ul className="row mr-1">
              <li className="col-8">
                  <Link to="/update-password">Change Password</Link>
                </li>
              <li className="col-3 ">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src="login/vendors/images/login-page-img.png" alt="" />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">
                    Register A New Member
                  </h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="select-role">
                    <div
                      className="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label className="btn active" onClick={handleAdminClick}>
                        <input type="radio" name="options" id="admin" />
                        <div className="icon">
                          <img
                            src="login/vendors/images/briefcase.svg"
                            className="svg"
                            alt=""
                          />
                        </div>
                        <span>For</span>
                        Admin
                      </label>
                      <label className="btn" onClick={handleUserClick}>
                        <input type="radio" name="options" id="user" />
                        <div className="icon">
                          <img
                            src="login/vendors/images/person.svg"
                            className="svg"
                            alt=""
                          />
                        </div>
                        <span>For</span>
                        User
                      </label>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-network" />
                      </span>
                    </div>
                  </div>
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
                        <i className="icon-copy dw dw-email" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
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
                  <div className="row pb-30">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        {/* <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Remember
                          </label> */}
                      </div>
                    </div>
                    <div className="col-6">
                      {/* <div className="forgot-password">
                          <Link to="update-password">Update Password</Link>
                        </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        {/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
										*/}
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Register
                        </button>
                      </div>
                      {/* <div
                          className="font-16 weight-600 pt-10 pb-10 text-center"
                          data-color="#707373"
                        >
                          OR
                        </div>
                        <div className="input-group mb-0">
                          <Link
                            className="btn btn-outline-primary btn-lg btn-block"
                            to="/register"
                          >
                            Register To Create Account
                          </Link>
                        </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
