import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, logout, resendConfirmation } from '../../actions/auth';

import Container from '../../molecules/container';
import Column from '../../molecules/column';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { errors, resendConfirmation } = this.props;
    const { email } = this.state;

    return (
      <Container>
        <Column styles="is-4 is-offset-4">
          <div className="box">
            <h3 className="title has-text-info">Trails Admin</h3>
            <form>
              <div className="field">
                <div className="control">
                  <input
                    id="email"
                    className={
                      'input ' +
                      (errors &&
                      (errors.code === 'UserNotFoundException' ||
                        errors.code === 'NotAuthorizedException' ||
                        errors.code === 'UserNotConfirmedException')
                        ? 'is-danger'
                        : '')
                    }
                    type="email"
                    placeholder="Email"
                    autoFocus
                    value={this.state.email}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                {errors &&
                  (errors.code === 'UserNotFoundException' ||
                    errors.code === 'NotAuthorizedException' ||
                    errors.code === 'UserNotConfirmedException') && (
                    <p className="help is-danger">
                      {errors.message}{' '}
                      {errors.code === 'UserNotConfirmedException' && (
                        <span
                          style={{ textDecoration: 'underline' }}
                          onClick={() => resendConfirmation(email)}
                        >
                          {' '}
                          resend code
                        </span>
                      )}
                    </p>
                  )}
              </div>

              <div className="field">
                <div className="control">
                  <input
                    id="password"
                    className={
                      'input ' +
                      (errors && errors.code === 'NotAuthorizedException'
                        ? 'is-danger'
                        : '')
                    }
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button
                className="button is-block is-info is-large is-fullwidth"
                onClick={this.handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
          <div>
            <Link to="/forgot" className="is-pulled-right">
              Forgot Password
            </Link>
          </div>
        </Column>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  login,
  logout,
  resendConfirmation: (username) => resendConfirmation(username),
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    errors: state.errors,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
