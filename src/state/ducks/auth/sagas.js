import {
  all,
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take
} from "redux-saga/effects";
import { REHYDRATE } from "redux-persist/constants";
import localForage from "localforage";

import actions from "./actions";
import types from "./types";
import api from "./api";

// TODO: use the action creators

function* login(username, password) {
  try {
    const { token, refresh_token, user } = yield call(
      api.getToken,
      username,
      password
    );
    yield put(actions.loginSuccess(token, refresh_token, user));
  } catch (err) {
    yield put(actions.loginFailed(err));
  } finally {
    if (yield cancelled()) {
      // ?? dunno what to put here
    }
  }
}

function* refreshJWT(refresh_token) {
  try {
    const { token, user } = yield call(api.refreshToken, refresh_token);
    yield put(actions.loginSuccess(token, refresh_token, user));
  } catch (err) {
    yield put(actions.loginFailed(err));
  } finally {
    if (yield cancelled()) {
      // ?? dunno what to put here
    }
  }
}

function* loginFlow() {
  while (true) {
    // Wait for login action, then wait for either logout or login_failed.
    const { type, payload } = yield take([types.LOGIN, types.REFRESH_JWT]);
    let task;
    if (type === types.LOGIN) {
      task = yield fork(login, payload.username, payload.password);
    } else {
      task = yield fork(refreshJWT, payload.token);
    }

    yield take([types.LOGOUT, types.LOGIN_FAILED, types.REFRESH_JWT_FAILED]);
    if (task) {
      yield cancel(task);
      task = null;
    }
    yield put(actions.logoutCompleted());
  }
}

function* refreshAuthOnStartFlow() {
  // Run-once on redux store rehydration to check if refresh token is available.
  yield take(REHYDRATE);
  const refreshToken = yield select(state => state.auth.refresh_token);
  if (refreshToken) {
    yield put(actions.refreshToken(refreshToken));
  }
}

export default function*() {
  yield all([fork(loginFlow), fork(refreshAuthOnStartFlow)]);
}
