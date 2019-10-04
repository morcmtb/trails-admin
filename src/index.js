import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import { store, history } from './store';
import { Router } from './router';

import aws_config from './aws_config';

import './index.scss';

Amplify.configure({
  Auth: {
    identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
    region: aws_config.cognito.REGION,
    userPoolId: aws_config.cognito.USER_POOL_ID,
    userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID,
    mandatorySignIn: false //TODO: research this flag
  },
  API: {
    endpoints: [
      {
        name: 'trails',
        endpoint: 'https://api.morcmtb.org'
      },
      {
        name: 'api',
        endpoint: 'https://pa2jiiv7i1.execute-api.us-east-1.amazonaws.com'
      }
    ]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
