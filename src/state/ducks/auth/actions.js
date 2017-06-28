import types from "./types";

export default {
  login: (username, password) => ({
    type: types.LOGIN,
    payload: {
      username,
      password
    }
  }),

  loginSuccess: (token, refresh_token, user) => ({
    type: types.LOGIN_COMPLETED,
    payload: {
      token,
      refresh_token,
      user
    }
  }),
  loginFailed: errorMessage => ({
    type: types.LOGIN_FAILED,
    payload: {
      errorMessage
    }
  }),

  logout: () => ({
    type: types.LOGOUT
  }),

  logoutCompleted: () => ({
    type: types.LOGOUT_COMPLETED
  }),

  refreshToken: token => ({
    type: types.REFRESH_JWT,
    payload: {
      token
    }
  }),

  refreshTokenFailed: error => ({
    type: types.REFRESH_JWT_FAILED,
    payload: error
  }),

  refreshTokenCompleted: () => ({
    type: types.REFRESH_JWT_COMPLETED
  })
};
