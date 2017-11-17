import { all, call, cancel, cancelled, fork, spawn, put, take } from 'redux-saga/effects';

import actions from './actions';
import types from './types';
import api from './api';
import history from 'state/history';
import { setAuthToken, clearAuthToken } from 'services/api';

function* register(values) {
  try {
    console.log('registering with data ', values);
    const user = yield call(api.register, values.payload);
    yield put(actions.registerSuccess(user));
    console.log(
      'register success, logging in user',
      values.payload.username,
      values.payload.password
    );
    yield put(actions.login(values.payload.username, values.payload.password));
  } catch (error) {
    console.log('register failed', error);
    yield put(actions.registerFailed(error));
  }
}

function* login(username, password) {
  try {
    const { token, refresh_token, user } = yield call(api.getToken, username, password);
    yield put(actions.loginSuccess(token, refresh_token, user));
    yield call(setAuthToken, token);
    yield call(history.push, '/');
  } catch (error) {
    if (typeof error === 'string') {
      yield put(
        actions.loginFailed({
          error: {
            non_field_errors: error
          }
        })
      );
    } else {
      const { username, password, non_field_errors } = error;
      const errors = {};
      if (username) {
        errors.username = username.join('. ');
      }
      if (password) {
        errors.password = password.join('. ');
      }
      if (non_field_errors) {
        errors.non_field_errors = non_field_errors.join('. ');
      }
      yield put(
        actions.loginFailed({
          error: errors
        })
      );
    }
  } finally {
    if (yield cancelled()) {
      // ?? dunno what to put here
    }
  }
}

function* refreshJWT(refresh_token) {
  try {
    const { token, user } = yield call(api.refreshToken, refresh_token);
    yield put(actions.refreshTokenCompleted(token, refresh_token, user));
    yield call(setAuthToken, token);
  } catch (err) {
    yield put(actions.refreshTokenFailed(String(err)));
  } finally {
    if (yield cancelled()) {
      // ?? dunno what to put here
    }
  }
}

function* loginFlow() {
  while (true) {
    // Wait for login action, then wait for either logout or login_failed.
    let task;
    const { type, payload } = yield take([types.LOGIN, types.REFRESH_JWT_COMPLETED]);
    if (type === types.LOGIN) {
      task = yield fork(login, payload.username, payload.password);
    }

    yield take([types.LOGOUT, types.LOGIN_FAILED]);
    if (task) {
      yield cancel(task);
      task = null;
    }
    yield call(clearAuthToken);
  }
}

function* refreshTokenFlow() {
  while (true) {
    const { payload: { token } } = yield take(types.REFRESH_JWT);
    yield fork(refreshJWT, token);
    yield take([types.REFRESH_JWT_COMPLETED, types.REFRESH_JWT_FAILED]);
  }
}

function* registerFlow() {
  while (true) {
    console.log('waiting for register');
    const values = yield take(types.REGISTER);
    console.log('got register action, launching register process');
    yield fork(register, values);
    console.log('waiting for register completion or failure');
    yield take([types.REGISTER_FAILED, types.REGISTER_SUCCESS]);
  }
}

export default function*() {
  yield all([spawn(registerFlow), spawn(loginFlow), spawn(refreshTokenFlow)]);
}
