import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import errors from './errors';
import isLoading from './loading';
import trails from './trails';
import users from './users';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    errors,
    isLoading,
    trails,
    users,
  });
