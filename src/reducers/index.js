import { combineReducers } from 'redux';
import { CHANGE_RANGE, SET_DIRECTOR, SET_CURRENT_ACTOR } from '../services/actions';

const initialState = {
  range: [1955, 2010],
  currentActor: null
};

function movies(state = initialState , action) {
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

const filmApp = combineReducers({
  movies
});

export default filmApp;