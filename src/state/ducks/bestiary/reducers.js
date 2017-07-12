import types from "./types";

/* State shape
{
  
}
*/

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    default:
      return state;
  }
}
