import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import schema from './schema';

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
const bestiaryPage = state => state.bestiary.bestiaryPage;
const bestiaryPageSize = state => state.bestiary.pageSize;

// Bestiary Entities
const getMonsters = (state, id) => _getEntityHelper(state.bestiary.monsters, id);
const getSkills = (state, id) => _getEntityHelper(state.bestiary.skills, id);
const getEffects = (state, id) => _getEntityHelper(state.bestiary.effects, id);
const getLeaderSkills = (state, id) => _getEntityHelper(state.bestiary.leaderSkills, id);
const getSources = (state, id) => _getEntityHelper(state.bestiary.sources, id);
const getMonsterFamily = (state, familyId) => {
  const monsters = getMonsters(state);

  return _getEntityHelper(
    state.bestiary.monsters,
    Object.keys(monsters).filter(monsterId => monsters[monsterId].family_id === familyId)
  );
};

const getMonsterList = createSelector(
  getMonsters,
  state => state.bestiary,
  (monsters, entities) => denormalize(Object.keys(monsters), schema.monsterList, entities)
);

// UI
const getSortKey = state => state.bestiary.sortKey;
const getSortDirection = state => state.bestiary.sortDirection;
const getListFilters = state => state.bestiary.filters;

const getSortedMonsterList = createSelector(
  getMonsterList,
  getSortKey,
  getSortDirection,
  (monsters, sortKey, sortDir) => {
    if (sortKey && sortDir) {
      return monsters.sort((a, b) => (a[sortKey] > b[sortKey] ? sortDir : -sortDir));
    }
    return monsters;
  }
);

// TODO: Add bestiary filtering based on state here
const getFilteredMonsterList = createSelector(
  getSortedMonsterList,
  getListFilters,
  (monsters, filters) => {
    let filteredMonsters = monsters;
    for (const [key, filterVals] of Object.entries(filters)) {
      if (Array.isArray(filterVals)) {
        filteredMonsters = filteredMonsters.filter(monster => filterVals.includes(monster[key]));
      } else {
        filteredMonsters = filteredMonsters.filter(monster => monster[key] === filterVals);
      }
    }

    return filteredMonsters;
  }
);

export default {
  isLoading,
  isPopulating,
  wasPopulated,
  lastPopulated,
  bestiaryPage,
  bestiaryPageSize,
  getMonsters,
  getMonsterList,
  getMonsterFamily,
  getSkills,
  getEffects,
  getFilteredMonsterList
};
