import { createSelector } from 'reselect';

// UI
const isLoading = state => state.bestiary.isLoading;
const isPopulating = state => state.bestiary.isPopulating;
const wasPopulated = state => state.bestiary.wasPopulated;
const lastPopulated = state => state.bestiary.lastPopulated;
const getCurrentPage = state => state.bestiary.currentPage;
const getPageSize = state => state.bestiary.pageSize;

// Bestiary Entities
const getMonsters = state => state.bestiary.entities.monsters;
const getSkills = state => state.bestiary.entities.skills;
const getLeaderSkills = state => state.bestiary.entities.leaderSkills;
const getSources = state => state.bestiary.entities.sources;

const getMonsterList = createSelector(
  getMonsters,
  getSkills,
  getLeaderSkills,
  getSources,
  (monsters, skills, leaderSkills, sources) =>
    Object.values(monsters)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(monster => ({
        ...monster,
        skills: monster.skills ? monster.skills.map(skillId => skills[skillId]) : null,
        leaderSkill: monster.leaderSkill ? leaderSkills[monster.leaderSkill] : null,
        source: monster.source ? monster.source.map(sourceId => sources[sourceId]) : null
      }))
);

const getObtainableMonsterList = createSelector(getMonsterList, monsters =>
  monsters.filter(mon => mon.obtainable)
);

// UI
const getVisibleMonsterList = createSelector(
  getObtainableMonsterList,
  getCurrentPage,
  getPageSize,
  (monsters, page, pageSize) => monsters.slice((page - 1) * pageSize, page * pageSize)
);

const getPageCount = createSelector(getPageSize, getObtainableMonsterList, (pageSize, monsters) => {
  return Math.ceil(monsters.length / pageSize);
});

export default {
  isLoading,
  isPopulating,
  wasPopulated,
  lastPopulated,
  getCurrentPage,
  getPageSize,
  getMonsters,
  getMonsterList,
  getObtainableMonsterList,
  getVisibleMonsterList,
  getPageCount
};
