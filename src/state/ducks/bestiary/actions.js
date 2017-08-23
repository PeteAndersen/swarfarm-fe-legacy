import types from './types';

const populateBestiary = () => ({
  type: types.POPULATE_BESTIARY
});

const populateBestiaryComplete = () => ({
  type: types.POPULATE_BESTIARY_COMPLETE
});

const populateBestiaryCancelled = () => ({
  type: types.POPULATE_BESTIARY_CANCELLED
});

const receiveBestiaryData = entities => ({
  type: types.RECEIVE_BESTIARY_DATA,
  payload: entities
});

const changePage = page => ({
  type: types.CHANGE_PAGE,
  payload: page
});

export default {
  populateBestiary,
  populateBestiaryComplete,
  populateBestiaryCancelled,
  receiveBestiaryData,
  changePage
};
