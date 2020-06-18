import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-router';

import { currentSession } from './actions/auth';

import UnauthenticatedRoute from './templates/UnauthenticatedRoute';
import AuthenticatedRoute from './templates/AuthenticatedRoute';

import Home from './pages/home';
import NotFound from './pages/notfound';
import Login from './pages/login';
import Forgot from './pages/login/forgot';
import Register from './pages/register';
import Confirm from './pages/register/confirm';
import Trails from './pages/trails';
import Users from './pages/users';

import Amplify from 'aws-amplify';
import aws_config from '../src/aws_config';

Amplify.configure({
  Auth: {
    identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
    region: aws_config.cognito.REGION,
    userPoolId: aws_config.cognito.USER_POOL_ID,
    userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID,
    mandatorySignIn: false, //TODO: research this flag
  },
  API: {
    endpoints: [
      {
        name: 'trails',
        endpoint: aws_config.endpoint.url,
      },
      {
        name: 'api',
        endpoint: aws_config.apiGateway.URL,
        region: aws_config.apiGateway.REGION,
      },
    ],
  },
});

export function Router() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const childProps = { isAuthenticated };

  useEffect(() => {
    dispatch(currentSession());
  }, []);

  return (
    <Switch>
      <UnauthenticatedRoute
        exact
        path="/"
        component={Login}
        props={childProps}
      />
      <UnauthenticatedRoute
        path="/forgot"
        component={Forgot}
        props={childProps}
      />
      <UnauthenticatedRoute
        path="/register"
        component={Register}
        props={childProps}
      />
      <UnauthenticatedRoute
        path="/confirm"
        component={Confirm}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/trails"
        component={Home}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/users"
        component={Users}
        props={childProps}
      />
      <AuthenticatedRoute
        exact
        path="/trails/:id"
        component={Trails}
        props={childProps}
      />
      <AuthenticatedRoute exact component={NotFound} props={childProps} />
    </Switch>
  );
}
