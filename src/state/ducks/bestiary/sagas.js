import { all, call, spawn, put, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import actions from './actions';
import api from './api';
import types from './types';
import schema from './schema';

function* getEntireList(apiFunc, dataSchema) {
  let page = 1;
  let data = {};
  do {
    data = yield call(apiFunc, page);
    const normalized = normalize(data.results, dataSchema);
    yield put(actions.receiveBestiaryData(normalized.entities));
    page += 1;
  } while (data.next);
}

function* populateBestiary() {
  while (true) {
    yield take(types.POPULATE_BESTIARY);
    // Load the entire bestiary
    try {
      yield* getEntireList(api.getMonsterList, schema.monsterList);
      yield* getEntireList(api.getSkillList, schema.skillList);
      yield put(actions.populateBestiaryComplete());
    } catch (err) {
      yield put(actions.populateBestiaryCancelled());
    }
  }
}

export default function*() {
  yield all([spawn(populateBestiary)]);
}
