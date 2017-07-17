import request from "services/api";

const getMonsterList = (page = null) => {
  let endpoint = "monsters/";

  if (page) {
    endpoint += `?page=${page}`;
  }
  return request("get", endpoint);
};

const getMonster = id => {
  return request("get", `monsters/${id}/`);
};

const getSkillList = (page = null) => {
  let endpoint = "skills/";

  if (page) {
    endpoint += `?page=${page}`;
  }
  return request("get", endpoint);
};

const getSkill = id => {
  return request("get", `skills/${id}/`);
};

export default { getMonsterList, getMonster, getSkillList, getSkill };
