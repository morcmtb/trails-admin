import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from '../../molecules/container';
import Column from '../../molecules/column';

import { forgotPassword, forgotPasswordSubmit } from '../../actions/auth';

class Forgot extends Component {
  state = {
    email: '',
    confirmationCode: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.props.forgotStepTwo) {
      this.props.forgotPasswordSubmit(
        this.state.email,
        this.state.confirmationCode,
        this.state.password
      );
    } else {
      this.props.forgotPassword(this.state.email);
    }
  };

  render() {
    const { errors, forgotStepTwo } = this.props;
    return (
      <Container>
        <Column styles="is-4 is-offset-4">
          <div className="box">
            <h3 className="title has-text-grey">Forgot Password</h3>
            <div className="field">
              <label className="label">Email</label>
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
                  <p className="help is-danger">{errors.message} </p>
                )}
            </div>
            <div className={'field ' + (!forgotStepTwo ? 'is-hidden' : '')}>
              <label className="label">Code</label>
              <div className="control">
                <input
                  id="confirmationCode"
                  className="input"
                  type="text"
                  placeholder="Confirmation Code"
                  autoFocus
                  value={this.state.confirmationCode}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              {errors && errors.code === 'CodeMismatchException' && (
                <p className="help is-danger">{errors.message}</p>
              )}
              <p className="help">
                Please check your email for your confirmation code
              </p>
            </div>
            <div className={'field ' + (!forgotStepTwo ? 'is-hidden' : '')}>
              <label className="label">Password</label>
              <div className="control">
                <input
                  id="password"
                  className={
                    'input ' +
                    (errors && errors.code === 'CodeMismatchException'
                      ? 'is-danger'
                      : '')
                  }
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left" />
                {errors && errors.code === 'InvalidPasswordException' && (
                  <p className="help is-danger">{errors.message} </p>
                )}
              </div>
            </div>

            <button
              className="button is-block is-info"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </Column>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  forgotPassword: (username) => forgotPassword(username),
  forgotPasswordSubmit: (username, code, new_password) =>
    forgotPasswordSubmit(username, code, new_password),
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    errors: state.errors,
    username: state.auth.username,
    forgotStepTwo: state.auth.forgotStepTwo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
