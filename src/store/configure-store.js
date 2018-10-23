import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import filmApp from './reducers';
import createHistory from 'history/createHashHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();

const routeMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  routeMiddleware
))(createStore);

const configureStore = (initialState = {}) => {
  return createStoreWithMiddleware(combineReducers({
    filmApp,
    router: routerReducer
  }), initialState);
};

export default configureStore;