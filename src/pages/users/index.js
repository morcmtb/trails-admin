import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUsers } from '../../actions/users'

class App extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return <div className="container">Users</div>
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = {
  getUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
