import { Auth } from 'aws-amplify';
import { push } from 'react-router-redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS';
export const CONFIRM_FAILURE = 'CONFIRM_FAILURE';
export const CONFIRM_RESEND = 'CONFIRM_RESEND';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const COMPLETE_NEW_PASSWORD = 'COMPLETE_NEW_PASSWORD';
export const VERIFY_ACCOUNT = 'VERIFY_ACCOUNT';
export const RETRIEVE_CURRENT_SESSION = 'RETRIEVE_CURRENT_SESSION';
export const RETRIEVE_CURRENT_USER = 'RETRIEVE_CURRENT_USER';

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

function loginFailure(error, username) {
  return {
    type: LOGIN_FAILURE,
    error,
    username
  };
}

function retrieveCurrentSession() {
  return {
    type: RETRIEVE_CURRENT_SESSION
  };
}

function loggedOut() {
  return {
    type: LOGOUT
  };
}

function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user
  };
}

export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error
  };
}

function confirmSuccess() {
  return {
    type: CONFIRM_SUCCESS
  };
}

function confirmFailure(error) {
  return {
    type: CONFIRM_FAILURE,
    error
  };
}

function confirmResend() {
  return {
    type: CONFIRM_RESEND
  };
}

function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS
  };
}
function forgotPasswordFailure(error) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    error
  };
}
function changePasswordSuccess(data) {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  };
}
function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error
  };
}

export function logout() {
  return (dispatch, getState) => {
    return Auth.signOut().then(() => {
      dispatch(loggedOut());
      dispatch(push('/login'));
    });
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return Auth.signIn(username, password)
      .then(res => {
        dispatch(loginSuccess(res));
        dispatch(push('/'));
      })
      .catch(err => {
        const error = {
          type: err.type,
          code: err.code,
          message: typeof err === 'object' ? err.message : err
        };

        return dispatch(loginFailure(error, username));
      });
  };
}

export function currentSession() {
  return (dispatch, getSate) => {
    dispatch(retrieveCurrentSession());
    return Auth.currentAuthenticatedUser()
      .then(res => {
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        dispatch(push('/login'));
      });
  };
}

export function register(email, password) {
  return (dispatch, getState) => {
    return Auth.signUp({
      username: email,
      password: password
    })
      .then(res => {
        dispatch(
          registerSuccess({
            username: res.user.username,
            isConfirmed: res.userConfirmed
          })
        );
        dispatch(push('/confirm'));
      })
      .catch(err => {
        dispatch(registerFailure(err));
      });
  };
}

export function confirm(username, confirmationCode) {
  return (dispatch, getState) => {
    return Auth.confirmSignUp(username, confirmationCode)
      .then(res => {
        dispatch(confirmSuccess(res));
        dispatch(push('/login'));
      })
      .catch(err => {
        dispatch(
          confirmFailure({
            code: err.code || 'CONFIRM_FAILURE',
            type: err.type,
            message: err.message || err
          })
        );
      });
  };
}

export function resendConfirmation(username) {
  return (dispatch, getState) => {
    dispatch(confirmResend());
    return Auth.resendSignUp(username)
      .then(res => {
        dispatch(confirmSuccess());
        dispatch(push('/confirm'));
      })
      .catch(err => {
        dispatch(confirmFailure(err));
      });
  };
}

export function forgotPassword(username) {
  return (dispatch, getState) => {
    return Auth.forgotPassword(username)
      .then(data => {
        dispatch(forgotPasswordSuccess());
      })
      .catch(err => {
        dispatch(forgotPasswordFailure(err));
      });
  };
}

export function forgotPasswordSubmit(username, code, new_password) {
  return (dispatch, getStage) => {
    return Auth.forgotPasswordSubmit(username, code, new_password)
      .then(data => {
        dispatch(changePasswordSuccess(data));
        dispatch(push('/login'));
      })
      .catch(err => {
        dispatch(changePasswordFailure(err));
      });
  };
}
