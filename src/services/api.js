import axios from "axios";
import localForage from "localforage";

const API_ROOT = "http://127.0.0.1:8000/api/v2/";
const Api = axios.create({
  baseURL: API_ROOT,
  timeout: 15000
});

const getAuthToken = () => {
  // const token = localForage.getItem("token");
  // return token ? token : undefined;
  return undefined;
};

export default function request(method, url, data) {
  const token = getAuthToken();

  const reqConfig = {
    method,
    url,
    data
  };

  if (token) {
    reqConfig["headers"] = { Authorization: `JWT ${token}` };
  }

  return Api(reqConfig).then(response => response.data).catch(function(error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error.message;
    }
  });
}
