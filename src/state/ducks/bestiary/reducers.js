import { persistReducer } from 'redux-persist';
import localForage from 'localforage';
import isEqual from 'lodash.isequal';

import types from './types';
import { defaultFilters } from './filters';

/* State shape
{
  monsters: {},
  skills: {},
  leaderSkills: {},
  effects: {},
  homunculusSkills: {},
  craftMaterials: {},
  sources: {},
  isLoading: boolean,
  isPopulating: boolean,
  wasPopulated: boolean,
  lastPopulated: datetime || null
  sortKey: string || null,
  sortDir: integer (-1 | 1)
  filters: {
    monster: [],
    skill: [],
  }
}
*/

const INITIAL_STATE = {
  isPopulating: false,
  wasPopulated: false,
  lastPopulated: null, // datetime || null
  monsters: {},
  skills: {},
  leaderSkills: {},
  effects: {},
  homunculusSkills: {},
  craftMaterials: {},
  sources: {},
  isLoading: false,
  sortKey: 'name', // attribute path for _.get()
  sortDirection: 1, // (-1 || 1)
  filters: defaultFilters
};

const persistConfig = {
  key: 'bestiary',
  storage: localForage,
  blacklist: ['isLoading', 'sortKey', 'sortDirection', 'filters']
};

const reducer = persistReducer(
  persistConfig,
  (state = INITIAL_STATE, { type: actionType, payload }) => {
    switch (actionType) {
      case types.RECEIVE_BESTIARY_DATA:
        // Compare each entity in payload to existing entities, update if different
        const newState = { ...state };
        let updated = false;

        for (const [entityType, newEntities] of Object.entries(payload)) {
          for (const [id, entity] of Object.entries(newEntities)) {
            if (state[entityType][id] === undefined || !isEqual(state[entityType][id], entity)) {
              newState[entityType] = { ...newState[entityType], [id]: entity };
              updated = true;
            }
          }
        }

        return updated ? newState : state;

      case types.POPULATE_BESTIARY:
        return {
          ...state,
          isPopulating: true,
          lastPopulated: new Date()
        };

      case types.POPULATE_BESTIARY_COMPLETE:
        return {
          ...state,
          wasPopulated: true,
          isPopulating: false
        };

      case types.POPULATE_BESTIARY_CANCELLED:
        return {
          ...state,
          isPopulating: false,
          lastPopulated: null
        };

      case types.GET_MONSTER:
        return {
          ...state,
          isLoading: true
        };

      case types.GET_MONSTER_COMPLETE:
        return {
          ...state,
          isLoading: false
        };

      case types.GET_MONSTER_FAILED:
        return {
          ...state,
          isLoading: false,
          error: payload
        };

      case types.GET_SKILL:
        return {
          ...state,
          isLoading: true
        };

      case types.GET_SKILL_COMPLETE:
        return {
          ...state,
          isLoading: false
        };

      case types.GET_SKILL_FAILED:
        return {
          ...state,
          isLoading: false,
          error: payload
        };
      case types.SET_BESTIARY_FILTERS:
        return {
          ...state,
          filters: payload
        };

      default:
        return state;
    }
  }
);

export default reducer;
