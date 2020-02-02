import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  register,
  registerFailure,
  resendConfirmation
} from '../../actions/auth'

import Container from '../../molecules/container'
import Column from '../../molecules/column'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  handleChange = e => {
    return this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.validateForm()) {
      this.props.register(this.state.email, this.state.password)
    } else {
      this.props.registerFailure({
        code: 'PASSWORD_MATCH',
        message: 'Please confirm your passwords match'
      })
    }
  }

  render() {
    const { errors, resendConfirmation } = this.props
    const { email } = this.state
    return (
      <Container>
        <Column styles="is-4 is-offset-4">
          <div className="box">
            <h1 className="title">Register</h1>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  id="email"
                  className={
                    'input ' +
                    (errors && errors.code === 'UsernameExistsException'
                      ? 'is-danger'
                      : '')
                  }
                  type="email"
                  placeholder="Email"
                  autoFocus
                  value={this.state.email}
                  onChange={e => {
                    this.handleChange(e)
                  }}
                />
              </div>
              {errors &&
                (errors.code === 'UsernameExistsException' ||
                  errors.code === 'NotAuthorizedException') && (
                  <p className="help is-danger">
                    {errors.message}
                    {errors.code === 'UsernameExistsException' && (
                      <span onClick={() => resendConfirmation(email)}>
                        {' '}
                        resend code
                      </span>
                    )}
                  </p>
                )}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  id="password"
                  className={
                    'input ' +
                    (errors &&
                    (errors.code === 'InvalidPasswordException' ||
                      errors.code === 'PASSWORD_MATCH')
                      ? 'is-danger'
                      : '')
                  }
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left" />
              </div>
              {errors &&
                (errors.code === 'InvalidPasswordException' ||
                  errors.code === 'PASSWORD_MATCH') && (
                  <p className="help is-danger">{errors.message}</p>
                )}
            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  id="confirmPassword"
                  className={
                    'input ' +
                    (errors &&
                    (errors.code === 'InvalidPasswordException' ||
                      errors.code === 'PASSWORD_MATCH')
                      ? 'is-danger'
                      : '')
                  }
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button onClick={this.handleSubmit} className="button is-info">
                  Register
                </button>
              </div>
            </div>
          </div>

          <p>
            <span
              className="has-text-link"
              onClick={() =>
                this.setState({
                  help: !this.state.help
                })
              }
              style={{ paddingLeft: 5 }}
            >
              Need Help?
            </span>
          </p>
          <p className={'help ' + (!this.state.help ? 'is-hidden' : '')}>
            Password Requirements: 8 Characters in length, uppercase letters,
            lowercase letters, special characters, numbers
          </p>
        </Column>
      </Container>
    )
  }
}
const mapDispatchToProps = {
  register,
  registerFailure: error => registerFailure(error),
  resendConfirmation: username => resendConfirmation(username)
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    errors: state.errors
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
