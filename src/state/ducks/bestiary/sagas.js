import { all, call, cancel, spawn, put, take } from "redux-saga/effects";
import { normalize } from "normalizr";

import actions from "./actions";
import api from "./api";
import types from "./types";
import schema from "./schema";

function* getEntireList(apiFunc, dataSchema) {
  let page = 1;
  let data = {};
  do {
    console.log("callin API");
    data = yield call(apiFunc, page);
    console.log(data);
    const normalized = normalize(data.results, dataSchema);
    yield put(actions.receiveBestiaryData(normalized.entities));
    page += 1;
  } while (data.next);
}

function* populateBestiary() {
  yield take(types.POPULATE_BESTIARY);
  console.log("populating entire bestiary...");
  // Load the entire bestiary
  //yield* getEntireList(api.getMonsterList, schema.monsterList);
  yield* getEntireList(api.getSkillList, schema.skillList);
}

export default function*() {
  yield all([spawn(populateBestiary)]);
}
