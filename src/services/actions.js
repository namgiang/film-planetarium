export const CHANGE_RANGE = 'CHANGE_RANGE';
export const GET_RANGE = 'GET_RANGE';
export const SET_DIRECTOR = 'SET_DIRECTOR';
export const SET_CURRENT_ACTOR = 'SET_CURRENT_ACTOR';


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