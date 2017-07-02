import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import "semantic-ui-css/semantic.min.css";

import App from "ui/layout/app";
import configureStore from "state/store";
import { history } from "state/store";
import registerServiceWorker from "./registerServiceWorker";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const RootHtml = () => (
  <Provider store={reduxStore}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

render(<RootHtml />, document.getElementById("root"));
registerServiceWorker();
