import MoviesService from '../../services/movies';

export const CHANGE_RANGE = 'CHANGE_RANGE';
export const GET_RANGE = 'GET_RANGE';
export const SET_CURRENT_DIRECTOR = 'SET_CURRENT_DIRECTOR';
export const SET_CURRENT_ACTOR = 'SET_CURRENT_ACTOR';
export const SET_POSTERS = 'SET_POSTERS';

export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const changeRange = range => {
  return { type: CHANGE_RANGE, range: range };
}

export const getRange = () => {
  return { type: GET_RANGE };
}

export const setCurrentDirector = director => {
	return { type: SET_CURRENT_DIRECTOR, currentDirector: director };
}

export const setCurrentActor = actor => {
	return { type: SET_CURRENT_ACTOR, currentActor: actor };
}

export const setPosters = urls => {
	return { type: SET_POSTERS, urls };
}

// fetch posters
export const requestData = () => {
  return {
    type: REQUEST_DATA
  };
};

export const receiveData = data => {
  return {
    type: RECEIVE_DATA,
    data
  };
};

export const fetchPosters = (directorName, range) => {
  return async (dispatch) => {
    dispatch(requestData());
    const urls = await MoviesService.fetchImageUrls(MoviesService.getMovies(directorName, range, null))
    return dispatch(receiveData(urls));
  };
};