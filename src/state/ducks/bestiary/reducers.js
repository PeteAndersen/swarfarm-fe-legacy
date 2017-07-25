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
  isPopulating: false,
  wasPopulated: false,
  lastPopulated: null,
  entities: {
    monsters: {},
    skills: {},
    leaderSkills: {},
    effects: {},
    homunculusSkills: {},
    craftMaterials: {},
    sources: {}
  },
  ui: {
    isLoading: false,
    currentPage: 1,
    pageSize: 50
  }
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case types.RECEIVE_BESTIARY_DATA:
      return {
        ...state,
        entities: {
          monsters: Object.assign({}, state.entities.monsters, payload.monsters),
          skills: Object.assign({}, state.entities.skills, payload.skills),
          leaderSkills: Object.assign({}, state.entities.leaderSkills, payload.leaderSkills),
          effects: Object.assign({}, state.entities.effects, payload.effects),
          homunculusSkills: Object.assign({}, state.entities.homunculusSkills, payload.homunculusSkills),
          craftMaterials: Object.assign({}, state.entities.craftMaterials, payload.craftMaterials),
          sources: Object.assign({}, state.entities.sources, payload.sources)
        }
      };

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
