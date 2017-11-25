import { createSelector } from 'reselect';

// UI
const isLoading = state => state.bestiary.isLoading;
const isPopulating = state => state.bestiary.isPopulating;
const wasPopulated = state => state.bestiary.wasPopulated;
const lastPopulated = state => state.bestiary.lastPopulated;

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
// TODO: Add bestiary filters here
const getVisibleMonsterList = createSelector(getObtainableMonsterList, monsters => monsters);

export default {
  isLoading,
  isPopulating,
  wasPopulated,
  lastPopulated,
  getMonsters,
  getMonsterList,
  getObtainableMonsterList,
  getVisibleMonsterList
};
