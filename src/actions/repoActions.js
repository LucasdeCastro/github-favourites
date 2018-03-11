import {
  FETCH_REPO_DATA,
  FETCH_REPO_DATA_FAIL,
  FETCH_REPO_PAGE_SUCCESS,
  FETCH_REPO_DATA_SUCCESS,
  SET_ERROR
} from "../utils/actions";
import { BASE_URL } from "../utils/constants";

export function fetchRepo(lang, page) {
  return dispatch => {
    dispatch({ type: FETCH_REPO_DATA });

    const type = page === 1 ? FETCH_REPO_DATA_SUCCESS : FETCH_REPO_PAGE_SUCCESS;

    fetch(`${BASE_URL}${lang}&page=${page}`)
      .then(e => e.json())
      .then(response => {
        dispatch({ type, payload: { ...response, page } });
      })
      .catch(error => {
        dispatch({ type: FETCH_REPO_DATA_FAIL });
        dispatch({
          type: SET_ERROR,
          payload: "Falha na requisição " + error.getMessage()
        });
      });
  };
}
