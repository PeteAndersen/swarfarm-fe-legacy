import { createSelector } from "reselect";

// UI
const isLoading = state => state.bestiary.isLoading;
const isPopulating = state => state.bestiary.isPopulating;
const wasPopulated = state => state.bestiary.wasPopulated;
const lastPopulated = state => state.bestiary.lastPopulated;
const getCurrentPage = state => state.bestiary.currentPage;
const getPageSize = state => state.bestiary.pageSize;

// Bestiary Entities
const getMonsters = state => state.bestiary.entities.monsters;

const getMonsterList = createSelector(getMonsters, monsters =>
  Object.values(monsters)
);

export default {
  isLoading,
  isPopulating,
  wasPopulated,
  lastPopulated,
  getCurrentPage,
  getPageSize,
  getMonsters,
  getMonsterList
};
