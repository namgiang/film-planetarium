import { combineReducers } from 'redux';
import { CHANGE_RANGE, SET_DIRECTOR } from '../services/actions';

const initialState = {
  range: [1955, 2010],
  director: null
};

function movies(state = initialState , action) {
  console.log('{2}');
  console.log(state);
	switch (action.type) {
    case CHANGE_RANGE:
      return {
        range: action.range,
        director: state.director
      };
    case SET_DIRECTOR:
      return {
        range: state.range,
        director: action.director
      };
    default:
      return state;
  }
}


const filmApp = combineReducers({
  movies
});

export default filmApp;