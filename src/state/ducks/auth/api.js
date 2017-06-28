import request from "services/api";

const getToken = (username, password) => {
  return request("post", "auth/get-token/", {
    username,
    password
  });
};

const refreshToken = refreshToken => {
  return request(
    "post",
    "auth/delegate-token/",
    {
      client_id: "swarfarm",
      refresh_token: refreshToken
    },
    false
  );
};

const verifyToken = token => {
  return request(
    "post",
    "auth/verify-token/",
    {
      token
    },
    false
  );
};

export default {
  getToken,
  refreshToken,
  verifyToken
};
