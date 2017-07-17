import types from "./types";

/* State shape
{
  isRehydrated: bool
}
*/

const INITIAL_STATE = {
  isRehydrated: false
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case types.REHYDRATE_COMPLETE:
      return {
        ...state,
        isRehydrated: true
      };
    default:
      return state;
  }
}
