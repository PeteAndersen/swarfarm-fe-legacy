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
  }
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
  }
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case types.RECEIVE_BESTIARY_DATA:
      console.log(payload);
      return {
        ...state,
        entities: {
          monsters: Object.assign(
            {},
            state.entities.monsters,
            payload.monsters
          ),
          skills: Object.assign({}, state.entities.skills, payload.skills),
          leaderSkills: Object.assign(
            {},
            state.entities.leaderSkills,
            payload.leaderSkills
          ),
          effects: Object.assign({}, state.entities.effects, payload.effects),
          homunculusSkills: Object.assign(
            {},
            state.entities.homunculusSkills,
            payload.homunculusSkills
          ),
          craftMaterials: Object.assign(
            {},
            state.entities.craftMaterials,
            payload.craftMaterials
          ),
          sources: Object.assign({}, state.entities.sources, payload.sources)
        }
      };
    default:
      return state;
  }
}
