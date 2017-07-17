import types from "./types";

const populateBestiary = () => ({
  type: types.POPULATE_BESTIARY
});

const receiveBestiaryData = entities => ({
  type: types.RECEIVE_BESTIARY_DATA,
  payload: entities
});

export default {
  populateBestiary,
  receiveBestiaryData
};
