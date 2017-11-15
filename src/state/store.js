import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';
import * as reducers from './ducks';
import rootSaga from './ducks/sagas';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['auth', 'bestiary']
};

const rootReducer = persistCombineReducers(persistConfig, {
  ...reducers,
  router: routerReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
