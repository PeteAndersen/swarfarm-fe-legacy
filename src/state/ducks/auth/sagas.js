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
    const authInfo = yield call(api.getToken, username, password);
    yield put({ type: types.LOGIN_COMPLETED, payload: authInfo });
    //yield call(localStorage.setItem, "token", authInfo.token);
    //yield call(localStorage.setItem, "refresh_token", authInfo.refresh_token);
  } catch (err) {
    yield put({ type: types.LOGIN_FAILED, payload: err });
  } finally {
    if (yield cancelled()) {
      console.log("Login saga cancelled");
      // ?? dunno what to put here
    }
  }
}

function* loginFlow() {
  while (true) {
    console.log("Waiting for login request");
    const { username, password } = yield take(types.LOGIN);
    console.log(`Got a login request for ${username} with pw ${password}`);
    const task = yield fork(login, username, password);
    yield take([types.LOGOUT, types.LOGIN_FAILED]);
    if (task) {
      yield cancel(task);
    }
    console.log("Clearing tokens");
    //yield call(localStorage.removeItem, "token");
    //yield call(localStorage.removeItem, "refresh_token");
    console.log("LOGOUT complete");
    yield put({ type: types.LOGOUT_COMPLETED });
  }
}

export default function*() {
  yield all([fork(loginFlow)]);
}
