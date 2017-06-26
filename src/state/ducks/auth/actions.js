import types from "./types";

const login = (username, password) => ({
  type: types.LOGIN,
  username,
  password
});

const logout = () => ({
  type: types.LOGOUT
});

const refresh_token = token => ({
  type: types.REFRESH_JWT,
  refresh_token: token
});

export default {
  login,
  logout,
  refresh_token
};
