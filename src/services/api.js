import axios from "axios";

const API_ROOT = "http://127.0.0.1:8000/api/v2/";
const Api = axios.create({
  baseURL: API_ROOT,
  timeout: 15000
});

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : undefined;
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

  return Api(reqConfig).then(response => response.data);
}
