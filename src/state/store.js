import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './ducks';
import rootSaga from './ducks/sagas';

export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = { key: 'root', storage: localForage };
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  persistStore(store);
  sagaMiddleware.run(rootSaga);

  return store;
}
