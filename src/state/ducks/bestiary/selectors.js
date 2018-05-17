import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import schema from './schema';

import applyFilters from 'services/filters';

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

const getFilteredMonsterList = createSelector(
  getSortedMonsterList,
  getListFilters,
  (monsters, filters) => {
    /* How filtering is going to work
    * 1. Filter is split into {monster, skill} keys
    * 2. Filter applies to skills, returns list of monster IDs from 'used_on' field
    * 3. Filter applies to monsters, returns list of IDs.
    * 4. Combine IDs, take unique set, get entities. 
    */
    //Todo: Implement above. For now this only works on monster entities directly.
    return applyFilters(monsters, filters.monster);
  }
);

export default {
  isLoading,
  isPopulating,
  wasPopulated,
  lastPopulated,
  getMonsters,
  getMonsterList,
  getMonsterFamily,
  getSkills,
  getEffects,
  getFilteredMonsterList
};
