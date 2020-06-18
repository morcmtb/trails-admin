import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { requestTrails } from '../../actions/trails';
import Trail from '../../organisms/trails/trail';

class App extends Component {
  componentDidMount() {
    this.props.requestTrails();
  }
  render() {
    const { trails } = this.props;
    return (
      <div className="container">
        {trails.map((t, i) => {
          return <Trail trail={t} key={i} />;
        })}
      </div>
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
