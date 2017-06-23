import { call } from "redux-saga/effects";
import api from "./api";

export default function*() {
  console.log("Hello Sagas!");
  const newsList = yield call(api.getNewsList);
  console.log(newsList);
}
