import MoviesService from '../services/movies';

export const CHANGE_RANGE = 'CHANGE_RANGE';
export const GET_RANGE = 'GET_RANGE';
export const SET_DIRECTOR = 'SET_DIRECTOR';
export const SET_CURRENT_ACTOR = 'SET_CURRENT_ACTOR';
export const SET_POSTERS = 'SET_POSTERS';

export function changeRange(range) {
  return { type: CHANGE_RANGE, range: range };
}

export function getRange() {
  return { type: GET_RANGE };
}

export function setDirector(director) {
	return { type: SET_DIRECTOR, director: director };
}

export function setCurrentActor(actor) {
	return { type: SET_CURRENT_ACTOR, currentActor: actor };
}

export function setPosters(urls) {
	return { type: SET_POSTERS, urls };
}

// fetch posters

export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const requestData = (): Object => {
  return {
    type: REQUEST_DATA
  };
};

export const receiveData = (data: Object): Object => {
  return {
    type: RECEIVE_DATA,
    data
  };
};

export const fetchPosters = (director, range): Function => {
  return (dispatch) => {
    dispatch(requestData());
    return MoviesService.fetchImageUrls(MoviesService.getMovies(director, range, null))
        .then(urls => {
            dispatch(receiveData(urls));
        });
  };
};