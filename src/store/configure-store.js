import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import filmApp from './reducers';
import { createBrowserHistory } from 'history';

import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  connectRouter(history)(filmApp),
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunkMiddleware
    ),
  ),
)

export default store;