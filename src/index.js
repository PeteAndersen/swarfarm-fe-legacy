import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import 'semantic-ui-css/semantic.min.css';

import configureStore from 'state/store';
import history from 'state/history';
import registerServiceWorker from './registerServiceWorker';

import App from 'ui/layout/app';
import GlobalLoader from 'ui/components/GlobalLoader';

const { store, persistor } = configureStore(window.REDUX_INITIAL_DATA);

const RootHtml = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<GlobalLoader />}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

render(<RootHtml />, document.getElementById('root'));
registerServiceWorker();
