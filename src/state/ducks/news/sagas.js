import { all, call, cancel, fork, put, take } from "redux-saga/effects";

import actions from "./actions";
import types from "./types";
import api from "./api";

function* loadPage(page = null) {
  try {
    console.log("Calling news API");
    const { results } = yield call(api.getNews, page);
    console.log(results);
    yield put(actions.getNewsSuccess(results));
  } catch (error) {
    yield put(
      actions.getNewsFailed({
        errorMessage: error.message
      })
    );
  }
}

function* watchGetNews() {
  while (true) {
    console.log("Waiting for GET_NEWS");
    const { payload: { page } } = yield take(types.GET_NEWS);
    console.log("Got GET_NEWS", page);
    const task = yield fork(loadPage, page);
    yield take([types.GET_NEWS_COMPLETED, types.GET_NEWS_FAILED]);
    if (task) {
      cancel(task);
    }
  }
}

export default function*() {
  yield all([fork(watchGetNews)]);
}
