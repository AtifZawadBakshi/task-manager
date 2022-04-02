import React from "react";
import axios from "axios";
export const URL = "https://10.100.17.47/FairEx/api/v1/";
export const ADMIN_LOGIN = "admin/login";
export const REGISTER = "admin/register";
export const PROFILE = "admin/profile";
const LOGOUT = "admin/logout";

const API = async (config) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "net work error",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = URL;
  return axios(config);
};

export default API;
