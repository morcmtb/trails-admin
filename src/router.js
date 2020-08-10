import React, { Component } from "react";
import { Switch } from "react-router";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { currentSession } from "./actions/auth";

import UnauthenticatedRoute from "./templates/UnauthenticatedRoute";
import AuthenticatedRoute from "./templates/AuthenticatedRoute";

import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import Forgot from "./pages/login/forgot";
import Register from "./pages/register";
import Confirm from "./pages/register/confirm";
import Trails from "./pages/trails";
import Users from "./pages/users";

import { CreateTrail } from "./pages/trails/create";

import Amplify from "aws-amplify";
import aws_config from "../src/aws_config";

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
        name: "trails",
        endpoint: aws_config.endpoint.url,
      },
      {
        name: "api",
        endpoint: aws_config.apiGateway.URL,
        region: aws_config.apiGateway.REGION,
      },
    ],
  },
});

class router extends Component {
  componentDidMount() {
    this.props.currentSession();
  }

  render() {
    return (
      <Switch>
        <UnauthenticatedRoute exact path="/" component={Login} />
        <UnauthenticatedRoute path="/forgot" component={Forgot} />
        <UnauthenticatedRoute path="/todolaterregister" component={Register} />
        <UnauthenticatedRoute path="/confirm" component={Confirm} />
        <AuthenticatedRoute exact path="/trails" component={Home} />
        <AuthenticatedRoute exact path="/createtrail" component={CreateTrail} />
        <AuthenticatedRoute exact path="/users" component={Users} />
        <AuthenticatedRoute exact path="/trails/:id" component={Trails} />
        <AuthenticatedRoute exact component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = { currentSession };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(router));
