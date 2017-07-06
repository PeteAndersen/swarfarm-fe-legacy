import { all, fork } from "redux-saga/effects";
import { formSubmitSaga } from "redux-form-submit-saga";
import { authRootSaga } from "./auth";

export const rootSaga = function*() {
  yield all([fork(authRootSaga), fork(formSubmitSaga)]);
};

export { default as auth } from "./auth";
