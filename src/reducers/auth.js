import * as authActions from "../actions/auth";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  username: null,
  isConfirmed: false,
  code: null,
  forgotStepTwo: false,
  challengeName: false,
  user: {},
};

export default (state = initialState, action) => {
  const { type, user } = action;

  switch (type) {
    case authActions.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case authActions.CHALLENGE_NAME:
      return {
        ...state,
        challengeName: true,
        user,
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        username: false,
        code: null,
        challengeName: false,
        user,
      };
    case authActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        code: null,
        isConfirmed: false,
        user: {},
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        username: action.username,
        isConfirmed:
          action.error.code === "UserNotConfirmedException" ? true : false,
        code: action.error.code,
      };
    case authActions.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRegistered: true,
        username: user.username,
        isConfirmed: user.isConfirmed,
        code: null,
        user,
      };

    case authActions.CONFIRM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isConfirmed: true,
      };
    case authActions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotStepTwo: true,
      };
    case authActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotStepTwo: false,
      };
    default:
      return state;
  }
};
