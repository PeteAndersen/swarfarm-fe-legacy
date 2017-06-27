import axios from "axios";
import JWT from "jwt-client";

const API_ROOT = "http://127.0.0.1:8000/api/v2/";
const Api = axios.create({
  baseURL: API_ROOT,
  timeout: 15000
});

export const setAuthToken = token => {
  JWT.keep(token);
};

export const clearAuthToken = () => {
  JWT.forget();
};

export const getAuthToken = () => {
  try {
    const token = JWT.get();
    return token;
  } catch (err) {
    return undefined;
  }
};

export default async function request(method, url, data, use_auth = true) {
  const token = JWT.get();
  const reqConfig = {
    method,
    url,
    data
  };

  if (token && JWT.validate(token) && use_auth) {
    reqConfig["headers"] = { Authorization: `JWT ${token}` };
  }

  try {
    const response = await Api(reqConfig);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err.message;
    }
  }
}
