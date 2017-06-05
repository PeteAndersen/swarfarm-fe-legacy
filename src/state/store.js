import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import * as reducers from "./ducks";

export default function configureStore( initialState ) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
