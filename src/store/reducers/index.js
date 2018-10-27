import { combineReducers } from 'redux';
import * as types from '../actions';

const initialAppState = {
  range: [1952, 2013],
  currentActor: null,
  currentDirector: null
};

const initialPostersState = {
  isFetching: true,
  urls: ''
};

const app = (state = initialAppState , action) => {
  switch (action.type) {
    case types.CHANGE_RANGE:
      return {
        ...state,
        range: action.range
      };
    case types.SET_CURRENT_ACTOR:
      return {
        ...state,
        currentActor: action.currentActor
      };
    case types.SET_CURRENT_DIRECTOR:
      return {
        ...state,
        currentDirector: action.currentDirector
      };
    default:
      return state;
  }
}

const posters = (state = initialPostersState, action) => {
  switch (action.type) {
    case types.REQUEST_DATA:
      return {
        ...state, 
        isFetching: true
      };
    case types.SET_POSTERS:
    case types.RECEIVE_DATA:
      console.log('[3]', action);
      return {
        isFetching: false,
        urls: action.urls
      };
    default:
      return state;
    }
};

const filmApp = combineReducers({
  app,
  posters
});

export default filmApp;