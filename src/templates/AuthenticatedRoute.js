import React from "react";
import { Route } from "react-router-dom";
import Header from "../organisms/header";
import Footer from "../organisms/footer";

const Layout = ({ children }) => (
  <div>
    <Header />
    <section className="hero is-fullheight">{children}</section>
    <Footer />
  </div>
);

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  return (
    <Layout>
      <Route {...rest} render={props => <C {...props} {...cProps} />} />
    </Layout>
  );
};

export default AuthenticatedRoute;
