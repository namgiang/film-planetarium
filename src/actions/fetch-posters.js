import MoviesService from '../services/movies';
export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const requestData = (): Object => {
  return {
    type: REQUEST_DATA
  };
};

export const receiveData = (urls: Object): Object => {
  return {
    type: RECEIVE_DATA,
    urls
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