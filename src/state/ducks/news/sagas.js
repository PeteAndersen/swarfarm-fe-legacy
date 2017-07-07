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

import actions from "./actions";
import types from "./types";
import api from "./api";

export default function*() {
  yield all([]);
}
