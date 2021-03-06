import axios from "axios";
// export const URL = "https://10.100.17.234/FairEx/api/v1/";
export const URL = "http://trueaviation.aero/FairEx/api/v1/";
export const ADMIN_LOGIN = "admin/login";
export const ADMIN_REGISTER = "admin/register";
export const USER_REGISTER = "user/register";
export const PROFILE = "admin/profile";
export const GET_TASK = "meet/task";
export const STORE_TASK = "meet/task";
export const UPDATE_TASK = "meet/task";
export const SHOW_TASK = "meet/task";
export const SHOW_SUBTASK = "meet/sub-task";
export const GET_SUBTASK = "meet/sub-task";
export const STORE_SUBTASK = "meet/sub-task";
export const UPDATE_SUBTASK = "meet/sub-task";
export const STATUS_SUBTASK = "meet/sub-task/status";
export const DATE_TASK = "meet/task/date";
export const DELETE_TASK = "meet/task";
export const DELETE_SUBTASK = "meet/sub-task";
export const UPDATE_PASSWORD = "admin/change-password";

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
