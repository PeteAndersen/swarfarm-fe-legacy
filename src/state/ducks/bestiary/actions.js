import types from './types';

const populateBestiary = () => ({
  type: types.POPULATE_BESTIARY
});

const populateBestiaryComplete = () => ({
  type: types.POPULATE_BESTIARY_COMPLETE
});

const populateBestiaryCancelled = () => ({
  type: types.POPULATE_BESTIARY_CANCELLED
});

const getMonster = id => ({
  type: types.GET_MONSTER,
  payload: id
});

const getMonsterComplete = () => ({
  type: types.GET_MONSTER_COMPLETE
});

const getMonsterFailed = error => ({
  type: types.GET_MONSTER_FAILED,
  payload: error
});

const getSkill = id => ({
  type: types.GET_SKILL,
  payload: id
});

const getSkillComplete = () => ({
  type: types.GET_SKILL_COMPLETE
});

const getSkillFailed = error => ({
  type: types.GET_SKILL_FAILED,
  payload: error
});

const receiveBestiaryData = entities => ({
  type: types.RECEIVE_BESTIARY_DATA,
  payload: entities
});

const setBestiaryPage = page => ({
  type: types.SET_BESTIARY_PAGE,
  payload: page
});

export default {
  populateBestiary,
  populateBestiaryComplete,
  populateBestiaryCancelled,
  getMonster,
  getMonsterFailed,
  getMonsterComplete,
  getSkill,
  getSkillFailed,
  getSkillComplete,
  receiveBestiaryData,
  setBestiaryPage
};
