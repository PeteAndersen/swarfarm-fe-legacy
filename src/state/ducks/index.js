import { all, fork } from "redux-saga/effects";
import { authRootSaga } from "./auth";

export const rootSaga = function*() {
  yield all([fork(authRootSaga)]);
};

export { default as auth } from "./auth";
