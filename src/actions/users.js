import AWS from 'aws-sdk'
import aws_config from '../../src/aws_config'
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: aws_config.cognito.REGION
})

const params = {
  UserPoolId: aws_config.cognito.USER_POOL_ID,

  AttributesToGet: ['username', 'email'],
  Filter: '',
  Limit: 0
}

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'

function getUsersRequest() {
  return {
    type: USERS_REQUEST
  }
}

function getUsersResult(users) {
  return {
    type: USERS_SUCCESS,
    users
  }
}

function getUsersFailure(error) {
  return {
    type: USERS_FAILURE,
    error
  }
}

export function getUsers() {
  return (dispatch, getState) => {
    dispatch(getUsersRequest())

    return cognitoidentityserviceprovider.listUsers(params, function(
      error,
      data
    ) {
      if (error) {
        dispatch(getUsersFailure(error))
      }
      dispatch(getUsersResult(data))
    })
  }
}
