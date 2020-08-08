import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

const history = createBrowserHistory(),
  initialState = {},
  enhancers = [],
  logger = createLogger({
    collapsed: true,
  }),
  middleware = [thunk, routerMiddleware(history), logger];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const composedEnhancers = composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  ),
  store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );

export { store, history };
