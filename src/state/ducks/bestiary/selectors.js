import { createSelector } from 'reselect';

const _getEntityHelper = (entities, id) => {
  //console.log(entities, id);
  if (id) {
    if (Array.isArray(id)) {
      // Array of IDs - return object of entities
      return id.reduce((effects, effect_id) => {
        effects[effect_id] = entities[effect_id];
        return effects;
      }, {});
    } else {
      // Return single entity
      return entities[id];
    }
  } else {
    // Return all entities
    return entities;
  }
};

// UI
const isLoading = state => state.bestiary.isLoading;
const isPopulating = state => state.bestiary.isPopulating;
const wasPopulated = state => state.bestiary.wasPopulated;
const lastPopulated = state => state.bestiary.lastPopulated;

// Bestiary Entities
const getMonsters = (state, id) => _getEntityHelper(state.bestiary.entities.monsters, id);
const getSkills = (state, id) => _getEntityHelper(state.bestiary.entities.skills, id);
const getEffects = (state, id) => _getEntityHelper(state.bestiary.entities.effects, id);
const getLeaderSkills = (state, id) => _getEntityHelper(state.bestiary.entities.leaderSkills, id);
const getSources = (state, id) => _getEntityHelper(state.bestiary.entities.sources, id);

const getMonsterList = createSelector(
  getMonsters,
  getSkills,
  getLeaderSkills,
  getSources,
  (monsters, skills, leaderSkills, sources) => {
    //console.log(monsters, skills, leaderSkills, sources);
    return Object.values(monsters)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(monster => ({
        ...monster,
        skills: monster.skills ? monster.skills.map(skillId => skills[skillId]) : null,
        leaderSkill: monster.leaderSkill ? leaderSkills[monster.leaderSkill] : null,
        source: monster.source ? monster.source.map(sourceId => sources[sourceId]) : null
      }));
  }
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
  getSkills,
  getEffects,
  getVisibleMonsterList
};
