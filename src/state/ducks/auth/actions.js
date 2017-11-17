import types from './types';

const login = (username, password) => ({
  type: types.LOGIN,
  payload: {
    username,
    password
  }
});

const loginSuccess = (token, refresh_token, user) => ({
  type: types.LOGIN_COMPLETED,
  payload: {
    token,
    refresh_token,
    user
  }
});
const loginFailed = errors => ({
  type: types.LOGIN_FAILED,
  payload: {
    ...errors
  }
});

const logout = () => ({
  type: types.LOGOUT
});

const refreshToken = token => ({
  type: types.REFRESH_JWT,
  payload: {
    token
  }
});

const refreshTokenFailed = error => ({
  type: types.REFRESH_JWT_FAILED,
  payload: error
});

const refreshTokenCompleted = (token, refresh_token, user) => ({
  type: types.REFRESH_JWT_COMPLETED,
  payload: {
    token,
    refresh_token,
    user
  }
});

export default {
  login,
  loginFailed,
  loginSuccess,
  logout,
  refreshToken,
  refreshTokenFailed,
  refreshTokenCompleted
};
