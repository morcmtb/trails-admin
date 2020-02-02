import * as userActions from '../actions/users'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  const { type, users } = action

  switch (type) {
    case userActions.USERS_SUCCESS:
      return {
        ...state,
        users: users
      }
    default:
      return state
  }
}
