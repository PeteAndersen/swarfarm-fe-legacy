import { merge } from "lodash";

import types from "./types";

/* State shape
{
  entities: {
    monsters: {},
    skills: {},
    leaderSkills: {},
    effects: {},
    homunculusSkills: {},
    craftMaterials: {},
    sources: {}
  },
  isLoading: boolean,
  isPopulating: boolean,
  wasPopulated: boolean,
  lastPopulated: datetime || null
  currentPage: integer,
  pageSize: integer,
  monsterList: [integer],
}
*/

const INITIAL_STATE = {
  entities: {
    monsters: {},
    skills: {},
    leaderSkills: {},
    effects: {},
    homunculusSkills: {},
    craftMaterials: {},
    sources: {}
  },
  isLoading: false,
  isPopulating: false,
  wasPopulated: false,
  lastPopulated: null,
  currentPage: 1,
  pageSize: 50,
  monsterList: []
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case types.RECEIVE_BESTIARY_DATA:
      return merge({ ...state }, { entities: payload });

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
    default:
      return state;
  }
}
