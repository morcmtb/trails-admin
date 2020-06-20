import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { NavHeader } from './../components/header/NavHeader';

import Footer from '../organisms/footer';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function Layout(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <div>
      <NavHeader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
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
