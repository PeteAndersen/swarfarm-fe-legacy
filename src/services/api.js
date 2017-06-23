import axios from "axios";

const API_ROOT = "http://127.0.0.1:8000/api/v2/";

export default function request(method, endpoint, data) {
  const url = endpoint.indexOf(API_ROOT) === -1
    ? API_ROOT + endpoint
    : endpoint;

  // TODO: Add automatically adding jwt token to headers if exists

  return axios({
    method,
    url,
    data
  }).then(response => response);
}
