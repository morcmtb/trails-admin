import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { NavHeader } from './../components/header/NavHeader';
import Header from '../organisms/header';
import Footer from '../organisms/footer';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    marginBottom: 55,
  },
}));

function Layout(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <div>
      <NavHeader />
      <div className={classes.appBarSpacer} />
      <section className="hero is-fullheight">{children}</section>
      <Footer />
    </div>
  );
}

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Layout>
      <Route {...rest} render={(props) => <C {...props} {...cProps} />} />
    </Layout>
  );
};

export default AuthenticatedRoute;
