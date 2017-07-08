import { combineReducers } from 'redux';
// import { CHANGE_RANGE, SET_CURRENT_ACTOR, SET_POSTERS } from '../actions/actions';
import * as types from "../actions";

const initialAppState = {
  range: [1955, 2010],
  currentActor: null
};

function app(state = initialAppState , action) {
  switch (action.type) {
    case types.CHANGE_RANGE:
      return {
        range: action.range,
        currentActor: state.currentActor
      };
    case types.SET_CURRENT_ACTOR:
      return {
        range: state.range,
        currentActor: action.currentActor
      };
    default:
      return state;
  }
}

// function posters(state = [], action) {
//   switch (action.type) {
//     case types.SET_POSTERS:
//       return action.posters
//     default:
//       return state;
//   }
// }

const posters = (state = {
  isFetching: false,
  urls: ""
}, action) => {
  switch (action.type) {
  case types.REQUEST_DATA:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.SET_POSTERS:
  case types.RECEIVE_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      urls: action.urls
    });
  default:
    return state;
  }
};

const filmApp = combineReducers({
  app,
  posters
});

export default filmApp;