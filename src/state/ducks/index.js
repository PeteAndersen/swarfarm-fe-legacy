import { all, fork } from "redux-saga/effects";
import { formSubmitSaga } from "redux-form-submit-saga";
import { authRootSaga } from "./auth";
import { newsRootSaga } from "./news";

export const rootSaga = function*() {
  yield all([fork(formSubmitSaga), fork(authRootSaga), fork(newsRootSaga)]);
};

export { default as auth } from "./auth";
export { default as news } from "./news";
