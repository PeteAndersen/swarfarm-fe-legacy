import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import App from 'ui/layout/app';
import registerServiceWorker from './registerServiceWorker';

const RootHtml = ( ) => (
  <Router>
    <App />
  </Router>
)

render(<RootHtml />, document.getElementById('root'));
registerServiceWorker();
