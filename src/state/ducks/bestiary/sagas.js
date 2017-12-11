import { all, call, spawn, put, take, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import actions from './actions';
import api from './api';
import types from './types';
import schema from './schema';

function* getEntireList(apiFunc, dataSchema) {
  let page = 1;
  let data = {};
  do {
    data = yield call(apiFunc, { page });
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

function* getMonster({ type, payload: id }) {
  try {
    const data = yield call(api.getMonster, id);
    const normalized = normalize(data, schema.monster);
    yield put(actions.receiveBestiaryData(normalized.entities));

    // Get its Skills
    for (let skillID of data.skills) {
      yield put(actions.getSkill(skillID));
    }

    // Monster family too
    const family = yield call(api.getMonsterList, { family_id: data.family_id });
    const normalized_family = normalize(family.results, schema.monsterList);
    yield put(actions.receiveBestiaryData(normalized_family.entities));

    yield put(actions.getMonsterComplete());
  } catch (err) {
    yield put(actions.getMonsterFailed(err));
  }
}

function* getSkill({ type, payload: id }) {
  try {
    const data = yield call(api.getSkill, id);
    const normalized = normalize(data, schema.skill);
    yield put(actions.receiveBestiaryData(normalized.entities));
    yield put(actions.getSkillComplete());
  } catch (err) {
    yield put(actions.getSkillFailed(err));
  }
}

function* getMonsterFlow() {
  yield takeEvery(types.GET_MONSTER, getMonster);
}

function* getSkillFlow() {
  yield takeEvery(types.GET_SKILL, getSkill);
}

export default function*() {
  yield all([spawn(populateBestiary), spawn(getMonsterFlow), spawn(getSkillFlow)]);
}
