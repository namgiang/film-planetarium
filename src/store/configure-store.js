import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
// import createLogger from "redux-logger";
import filmApp from '../reducers/index';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

// const loggerMiddleware = createLogger();

const history = createHistory();

const routeMiddleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  routeMiddleware
)(createStore);

const configureStore = function (initialState: Object = {}): Function {
  return createStoreWithMiddleware(combineReducers({
    filmApp,
    router: routerReducer
  }), initialState);
};

export default configureStore;