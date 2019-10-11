import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !props.authenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default UnauthenticatedRoute;
