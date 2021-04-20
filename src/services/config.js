import axios from "axios";
import { APIPath } from "@constants/common.js";

const request = axios.create({
  baseURL: APIPath,
  headers: { "Content-Type": "application/json" },
});
// intercepting to capture errors
request.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    const status = error && error.response && error.response.status;
    switch (status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Authorization Error";
        break;
      case 403:
        message = "enter your location!!";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject({ status: status, msg: message });
  }
);
class APIRequestWeather {
  get = (url, params) => {
    return request.get(url, params);
  };
  post = (url, data) => {
    return request.post(url, data);
  };
}

export { APIRequestWeather };
