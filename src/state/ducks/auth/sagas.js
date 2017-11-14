import { all, call, cancel, cancelled, fork, spawn, put, select, take } from 'redux-saga/effects';

import actions from './actions';
import types from './types';
import api from './api';
import history from 'state/history';
import { setAuthToken, clearAuthToken } from 'services/api';

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
          _error: {
            non_field_errors: error
          }
        })
      );
    } else {
      const { username, password, non_field_errors } = error;
      yield put(
        actions.loginFailed({
          _error: {
            username: username ? username.join('. ') : null,
            password: password ? password.join('. ') : null,
            non_field_errors: non_field_errors ? non_field_errors.join('. ') : null
          }
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
    yield put(actions.logoutCompleted());
  }
}

function* refreshTokenFlow() {
  while (true) {
    const { payload: { token } } = yield take(types.REFRESH_JWT);
    yield fork(refreshJWT, token);
    yield take([types.REFRESH_JWT_COMPLETED, types.REFRESH_JWT_FAILED]);
  }
}

export default function*() {
  yield all([spawn(loginFlow), spawn(refreshTokenFlow)]);
}
