import { API } from "aws-amplify";
import aws_config from "./../aws_config";
import { push } from "react-router-redux";
export const TRAILS_REQUEST = "TRAILS_REQUEST";
export const TRAILS_REQUEST_SUCCESS = "TRAILS_REQUEST_SUCCESS";
export const TRAILS_REQUEST_FAILURE = "TRAILS_REQUEST_FAILURE";

export const TRAILS_UPDATE = "TRAILS_UPDATE";
export const TRAILS_UPDATE_SUCCESS = "TRAILS_UPDATE_SUCCESS";
export const TRAILS_UPDATE_FAILURE = "TRAILS_UPDATE_FAILURE";

export const CREATE_TRAIL = "CREATE_TRAIL";
export const CREATE_TRAIL_SUCCESS = "CREATE_TRAIL_SUCCESS";
export const CREATE_TRAIL_FAILURE = "CREATE_TRAIL_FAILURE";

function trailsRequest() {
  return {
    type: TRAILS_REQUEST,
  };
}

function trailsRequestSuccess(trails) {
  return {
    type: TRAILS_REQUEST_SUCCESS,
    trails,
  };
}
function trailsRequestFailure(error) {
  return {
    type: TRAILS_REQUEST_FAILURE,
    error,
  };
}

function createTrail() {
  return {
    type: CREATE_TRAIL,
  };
}

function createTrailSuccess() {
  return {
    type: CREATE_TRAIL_SUCCESS,
  };
}

function createTrailFailure(error) {
  return {
    type: CREATE_TRAIL_FAILURE,
    error,
  };
}

function trailsUpdate() {
  return {
    type: TRAILS_UPDATE,
  };
}

function trailUpdateSuccess(trail) {
  return {
    type: TRAILS_UPDATE_SUCCESS,
  };
}

function trailUpdateFailure(error) {
  return {
    type: TRAILS_UPDATE_FAILURE,
    error,
  };
}

export function requestTrails() {
  return (dispatch, getState) => {
    dispatch(trailsRequest());
    const apiName = "trails",
      path = "/v1/trails",
      myInit = {
        headers: {},
        response: true,
      };
    return API.get(apiName, path, myInit)
      .then((res) => {
        dispatch(trailsRequestSuccess(res));
      })
      .catch((error) => {
        dispatch(trailsRequestFailure(error));
      });
  };
}

export function updateTrail(trail) {
  return (dispatch, getState) => {
    dispatch(trailsUpdate());
    const apiName = "api",
      path = `/${aws_config.sls.stage}/trails/${trail.trailId}`,
      myInit = {
        headers: {
          Accept: "application/json",
        },
        body: trail,
      };
    return API.put(apiName, path, myInit)
      .then((res) => {
        dispatch(trailUpdateSuccess(res));
        dispatch(push("/trails"));
      })
      .catch((error) => {
        dispatch(trailUpdateFailure(error));
      });
  };
}

export function trailCreate(trail) {
  return (dispatch, getState) => {
    dispatch(createTrail(trail));
    const apiName = "api",
      path = `/${aws_config.sls.stage}/trails`,
      myInit = {
        headers: {
          Accept: "application/json",
        },
        body: trail,
      };

    return API.post(apiName, path, myInit)
      .then((res) => {
        dispatch(createTrailSuccess(res));
        dispatch(push("/trails"));
      })
      .catch((error) => {
        dispatch(createTrailFailure(error));
      });
  };
}
