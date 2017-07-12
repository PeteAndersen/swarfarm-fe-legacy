import { all, call, cancel, fork, put, take } from "redux-saga/effects";

import actions from "./actions";
import types from "./types";
import api from "./api";

export default function*() {
  yield all([]);
}
