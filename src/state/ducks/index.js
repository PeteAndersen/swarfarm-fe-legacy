import { all, spawn } from "redux-saga/effects";
import { formSubmitSaga } from "redux-form-submit-saga";
import { authRootSaga } from "./auth";
import { newsRootSaga } from "./news";
import { bestiaryRootSaga } from "./bestiary";

export const rootSaga = function*() {
  yield all([
    spawn(formSubmitSaga),
    spawn(authRootSaga),
    spawn(newsRootSaga),
    spawn(bestiaryRootSaga)
  ]);
};

export { default as auth } from "./auth";
export { default as news } from "./news";
export { default as bestiary } from "./bestiary";
export { default as ui } from "./ui";
