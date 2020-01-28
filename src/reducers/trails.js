import * as trailsActions from '../actions/trails'

const initialState = {
  trails: [],
  isLoading: false
}

export default (state = initialState, action) => {
  const { type, trails } = action

  switch (type) {
    case trailsActions.TRAILS_REQUEST:
    case trailsActions.TRAILS_UPDATE:
      return {
        ...state,
        isLoading: true
      }
    case trailsActions.TRAILS_UPDATE_FAILURE:
    case trailsActions.TRAILS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case trailsActions.TRAILS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case trailsActions.TRAILS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trails: trails.data
      }
    default:
      return state
  }
}
