import React, { Component } from "react";
import axios from "axios";
import * as Helper from "../../Layouts/Helper";
import { Route, withRouter } from "react-router-dom";
import { URL, ADMIN_LOGIN } from "../../Axios/Api";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  changeFormField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  formSubmit(e) {
    e.preventDefault();
    let props = this.props;
    axios
      .post(URL + ADMIN_LOGIN, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          Helper.alertMessage("success", "Login has been successfully!");
          props.history.push("/dashboard");
          window.location.reload();
        }
      })
      .catch(function (error) {
        Helper.alertMessage("error", "Something went wrong!");
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-header box-shadow">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="brand-logo">
              <Link to="/">
                <img src="vendors/images/icon-light.png" alt />
              </Link>
            </div>
            <div className="login-menu">
              <ul>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-7">
                <img src="vendors/images/login-page-img.png" alt />
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="login-box bg-white box-shadow border-radius-10">
                  <div className="login-title">
                    <h2 className="text-center text-primary">
                      Login To Task Manager
                    </h2>
                  </div>
                  <form onSubmit={this.formSubmit}>
                    <div className="select-role">
                      <div
                        className="btn-group btn-group-toggle"
                        data-toggle="buttons"
                      ></div>
                    </div>
                    <div className="input-group custom">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={this.changeFormField}
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
                        placeholder="**********"
                        required
                        name="password"
                        onChange={this.changeFormField}
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
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Remember
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password">
                          <a href="forgot-password.html">Forgot Password</a>
                        </div>
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
                            Sign in
                          </button>
                        </div>
                        <div
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
    );
  }
}

export default withRouter(Login);
