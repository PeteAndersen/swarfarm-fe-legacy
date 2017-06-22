import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
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
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
