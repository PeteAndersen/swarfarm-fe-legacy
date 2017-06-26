import {
  all,
  call,
  cancel,
  cancelled,
  fork,
  take,
  put
} from "redux-saga/effects";
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

function* loginFlow() {
  while (true) {
    // Wait for login action, then wait for either logout or login_failed.
    const { payload: { username, password } } = yield take(types.LOGIN);
    const task = yield fork(login, username, password);

    yield take([types.LOGOUT, types.LOGIN_FAILED]);
    if (task) {
      yield cancel(task);
    }
    yield put(actions.logoutCompleted());
  }
}

export default function*() {
  yield all([fork(loginFlow)]);
}
