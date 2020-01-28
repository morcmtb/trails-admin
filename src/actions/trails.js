import { API } from 'aws-amplify'
import { push } from 'react-router-redux'
export const TRAILS_REQUEST = 'TRAILS_REQUEST'
export const TRAILS_REQUEST_SUCCESS = 'TRAILS_REQUEST_SUCCESS'
export const TRAILS_REQUEST_FAILURE = 'TRAILS_REQUEST_FAILURE'

export const TRAILS_UPDATE = 'TRAILS_UPDATE'
export const TRAILS_UPDATE_SUCCESS = 'TRAILS_UPDATE_SUCCESS'
export const TRAILS_UPDATE_FAILURE = 'TRAILS_UPDATE_FAILURE'

function trailsRequest() {
  return {
    type: TRAILS_REQUEST
  }
}

function trailsRequestSuccess(trails) {
  return {
    type: TRAILS_REQUEST_SUCCESS,
    trails
  }
}
function trailsRequestFailure(error) {
  return {
    type: TRAILS_REQUEST_FAILURE,
    error
  }
}

function trailsUpdate() {
  return {
    type: TRAILS_UPDATE
  }
}

function trailUpdateSuccess(trail) {
  return {
    type: TRAILS_UPDATE_SUCCESS
  }
}

function trailUpdateFailure(error) {
  return {
    type: TRAILS_UPDATE_FAILURE,
    error
  }
}

export function requestTrails() {
  return (dispatch, getState) => {
    dispatch(trailsRequest())
    const apiName = 'trails',
      path = '/v1/trails',
      myInit = {
        headers: {},
        response: true
      }
    return API.get(apiName, path, myInit)
      .then(res => {
        dispatch(trailsRequestSuccess(res))
      })
      .catch(error => {
        dispatch(trailsRequestFailure(error))
      })
  }
}

export function updateTrail(trail) {
  return (dispatch, getState) => {
    dispatch(trailsUpdate())
    const apiName = 'api',
      path = `/dev/trails/${trail.trailId}`,
      myInit = {
        headers: {
          Accept: 'application/json'
        },
        body: trail
      }
    return API.put(apiName, path, myInit)
      .then(res => {
        dispatch(trailUpdateSuccess(res))
        dispatch(push('/'))
      })
      .catch(error => {
        dispatch(trailUpdateFailure(error))
      })
  }
}
