import request from "services/api";

export default {
  getToken: (username, password) => {
    return request("post", "auth/get-token/", {
      username,
      password
    });
  },
  refreshToken: refreshToken => {
    return request("post", "auth/delegate-token/", {
      client_id: "swarfarm",
      refresh_token: refreshToken
    });
  },
  verifyToken: token => {
    return request("post", "auth/verify-token/", {
      token
    });
  }
};
