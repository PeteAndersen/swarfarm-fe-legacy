import { createSelector } from 'reselect';

const _getEntityHelper = (entities, entity_ids) => {
  if (entity_ids) {
    if (Array.isArray(entity_ids)) {
      // Array of IDs - return object of entities
      return entity_ids.reduce((entity_map, id) => {
        entity_map[id] = entities[id];
        return entity_map;
      }, {});
    } else {
      // Return single entity
      return entities[entity_ids];
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
const getMonsterFamily = (state, familyId) => {
  const monsters = getMonsters(state);

  return _getEntityHelper(
    state.bestiary.entities.monsters,
    Object.keys(monsters).filter(monsterId => monsters[monsterId].family_id === familyId)
  );
};

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
        skills: monster.skills ? _getEntityHelper(skills, monster.skills) : null,
        leaderSkill: monster.leaderSkill
          ? _getEntityHelper(getLeaderSkills, monster.leaderSkill)
          : null,
        source: monster.source ? _getEntityHelper(getSources, monster.source) : null
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
  getMonsterFamily,
  getSkills,
  getEffects,
  getVisibleMonsterList
};
