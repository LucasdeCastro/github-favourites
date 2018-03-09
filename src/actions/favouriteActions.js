import { REMOVE_FAVOURITE, ADD_FAVOURITE } from "../utils/actions";

export function addFavourite(item) {
  return dispatch => dispatch({ type: ADD_FAVOURITE, payload: [item] });
}

export function removeFavourite(item) {
  return dispatch => dispatch({ type: ADD_FAVOURITE, payload: [item] });
}
