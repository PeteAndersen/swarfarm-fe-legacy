import request from 'services/api';

const register = values =>
  request('post', 'profiles/', {
    ...values
  });

const getToken = (username, password) =>
  request('post', 'auth/get-token/', {
    username,
    password
  });

const refreshToken = refreshToken =>
  request(
    'post',
    'auth/delegate-token/',
    {
      client_id: 'swarfarm',
      refresh_token: refreshToken
    },
    false
  );

const verifyToken = token =>
  request(
    'post',
    'auth/verify-token/',
    {
      token
    },
    false
  );

export default {
  register,
  getToken,
  refreshToken,
  verifyToken
};
