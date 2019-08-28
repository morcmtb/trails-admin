import React from 'react';
import { Switch } from 'react-router';

import UnauthenticatedRoute from './templates/UnauthenticatedRoute';
import AuthenticatedRoute from './templates/AuthenticatedRoute';

import App from './pages/App';

export function Router() {
  return (
    <Switch>
      <UnauthenticatedRoute path="/" component={App} />
    </Switch>
  );
}
