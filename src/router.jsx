import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Switch } from 'react-router';

import UnauthenticatedRoute from './templates/UnauthenticatedRoute';
import AuthenticatedRoute from './templates/AuthenticatedRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

export function Router() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    async function currentSession() {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
      } catch (error) {
        console.log('Error on Auth.currentSession: ', error);
        setAuthenticating(false);
      }
    }
    currentSession();
  }, []);

  return (
    <Switch>
      <AuthenticatedRoute
        exact
        path="/"
        component={Home}
        props={{
          authenticated,
          authenticating
        }}
      />
      <UnauthenticatedRoute
        exact
        path="/login"
        component={Login}
        props={{
          authenticated,
          authenticating
        }}
      />
      <UnauthenticatedRoute component={NotFound} />
    </Switch>
  );
}
