import { CLEAR_ERROR, SET_ERROR } from "../utils/actions";

export function setError(error) {
  return dispatch => error && dispatch({ type: SET_ERROR, payload: error });
}

export function clearError() {
  return dispatch => dispatch({ type: CLEAR_ERROR });
}
