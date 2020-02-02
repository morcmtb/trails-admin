import React, { Component } from 'react'
import { connect } from 'react-redux'

import { register, confirm, resendConfirmation } from '../../actions/auth'

import Container from '../../molecules/container'
import Column from '../../molecules/column'

class SignUp extends Component {
  state = {
    confirmationCode: ''
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0
  }

  handleChange = e => {
    return this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleConfirmationSubmit = e => {
    e.preventDefault()
    const { username } = this.props
    this.props.confirm(username, this.state.confirmationCode)
  }

  render() {
    const { errors } = this.props
    return (
      <Container>
        <Column styles="is-4 is-offset-4">
          <div className="box">
            <h1 className="title">Register</h1>
            <div className="field">
              <label className="label">Code</label>
              <div className="control">
                <input
                  id="confirmationCode"
                  className="input"
                  type="text"
                  placeholder="Confirmation Code"
                  autoFocus
                  value={this.state.confirmationCode}
                  onChange={e => {
                    this.handleChange(e)
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

            <div className="field">
              <div className="control">
                <button
                  onClick={this.handleConfirmationSubmit}
                  disabled={!this.validateConfirmationForm()}
                  className="button is-primary"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Column>
      </Container>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    username: state.auth.username,
    errors: state.errors
  }
}
const mapDispatchToProps = { register, confirm, resendConfirmation }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
