import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { store, history, persistor } from './store';
import * as serviceWorker from './serviceWorker';

import { Router } from './router';
import { Theming } from './Theming';

import './index.scss';
import './FontAwesome';

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Theming>
          <Router />
        </Theming>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
// If you want your app./Themingk offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
