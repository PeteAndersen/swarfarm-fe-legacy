import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './ducks'
import { rootSaga } from './ducks'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    ...reducers,
    form: formReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  
  return store;
}
