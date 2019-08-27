import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import App from './pages/App';

export function Router() {
  return (
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  );
}
