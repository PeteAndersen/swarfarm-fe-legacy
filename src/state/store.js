import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, autoRehydrate } from "redux-persist";
import localForage from "localforage";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

import { reducer as formReducer } from "redux-form";

import * as reducers from "./ducks";
import { rootSaga } from "./ducks";

export const history = createHistory();

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer,
    form: formReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
      autoRehydrate()
    )
  );

  sagaMiddleware.run(rootSaga);
  persistStore(store, {
    storage: localForage,
    blacklist: ["rootSaga", "form", "router"]
  });

  return store;
}
