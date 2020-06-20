import React, { Component } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { requestTrails } from '../../actions/trails';

import { Trail } from './../../components/trail/ListView';
class App extends Component {
  componentDidMount() {
    this.props.requestTrails();
  }
  render() {
    const { trails } = this.props;
    return (
      <Grid container>
        {trails.map((t, i) => {
          return (
            <Grid item xs={12} key={i}>
              <Trail trail={t} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    trails: state.trails.trails,
  };
};
const mapDispatchToProps = { logout, requestTrails };

export default connect(mapStateToProps, mapDispatchToProps)(App);
