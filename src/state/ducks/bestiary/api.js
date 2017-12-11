import request from 'services/api';

const getMonsterList = params => {
  return request('get', 'monsters/', null, params);
};

const getMonster = id => request('get', `monsters/${id}/`);

const getSkillList = params => {
  return request('get', 'skills/', null, params);
};

const getSkill = id => request('get', `skills/${id}/`);

export default { getMonsterList, getMonster, getSkillList, getSkill };
