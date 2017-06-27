import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, autoRehydrate } from "redux-persist";
import localForage from "localforage";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

import { reducer as formReducer } from "redux-form";

import * as reducers from "./ducks";
import { rootSaga } from "./ducks";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    ...reducers,
    form: formReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware), autoRehydrate())
  );

  sagaMiddleware.run(rootSaga);
  persistStore(store, {
    storage: localForage,
    debounce: 1000,
    whitelist: ["auth", "bestiary"]
  });

  return store;
}
