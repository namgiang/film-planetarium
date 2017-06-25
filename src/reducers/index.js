import { combineReducers } from 'redux';
import { CHANGE_RANGE, SET_CURRENT_ACTOR, SET_POSTERS } from '../services/actions';

const initialAppState = {
  range: [1955, 2010],
  currentActor: null
};

function app(state = initialAppState , action) {
  switch (action.type) {
    case CHANGE_RANGE:
      return {
        range: action.range,
        currentActor: state.currentActor
      };
    case SET_CURRENT_ACTOR:
      return {
        range: state.range,
        currentActor: action.currentActor
      };
    default:
      return state;
  }
}

function posters(state = [], action) {
  switch (action.type) {
    case SET_POSTERS:
      return action.posters
    default:
      return state;
  }
}

const filmApp = combineReducers({
  app,
  posters
});

export default filmApp;