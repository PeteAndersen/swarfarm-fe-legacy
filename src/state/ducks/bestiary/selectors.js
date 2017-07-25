import { createSelector } from "reselect";

// UI
const isLoading = state => state.bestiary.isLoading;
const isPopulating = state => state.bestiary.isPopulating;
const wasPopulated = state => state.bestiary.wasPopulated;
const lastPopulated = state => state.bestiary.lastPopulated;
const getCurrentPage = state => state.bestiary.ui.currentPage;
const getPageSize = state => state.bestiary.ui.pageSize;

// Bestiary Entities
const getMonsters = state => state.bestiary.entities.monsters;

const getMonsterList = createSelector(getMonsters, monsters => {
  const monsterArray = Object.values(monsters);
  return monsterArray
    .filter(mon => mon.obtainable)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
});

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
