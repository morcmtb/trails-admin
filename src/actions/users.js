import { API } from "aws-amplify";
import aws_config from "../../src/aws_config";

export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAILURE = "USERS_FAILURE";

function getUsersRequest() {
  return {
    type: USERS_REQUEST,
  };
}

function getUsersResult(users) {
  return {
    type: USERS_SUCCESS,
    users,
  };
}

function getUsersFailure(error) {
  return {
    type: USERS_FAILURE,
    error,
  };
}

export function getUsers() {
  return (dispatch, getState) => {
    dispatch(getUsersRequest());
    return API.get("users", "/v1/users", {
      headers: { Accept: "application/json" },
      response: true,
    })
      .then((res) => {
        const { data } = res;
        dispatch(getUsersResult(data));
      })
      .catch((error) => {
        dispatch(getUsersFailure(error));
      });
  };
}
