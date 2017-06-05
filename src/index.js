import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from 'ui/layout/app';
import configureStore from "state/store";
import registerServiceWorker from './registerServiceWorker';

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );

const RootHtml = ( ) => (
  <Provider store={ reduxStore }>
    <Router>
      <App />
    </Router>
  </Provider>
)

render(<RootHtml />, document.getElementById('root'));
registerServiceWorker();
