import {
  FETCH_DATA,
  FETCH_DATA_FAIL,
  FETCH_DATA_SUCCESS
} from "../utils/actions";
import { BASE_URL } from "../utils/constants";

export function fetchRepo(lang, page) {
  return dispatch => {
    dispatch({ type: FETCH_DATA });

    fetch(`${BASE_URL}${lang}&page=${page}`)
      .then(e => e.json())
      .then(response => {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: response });
      });
  };
}
