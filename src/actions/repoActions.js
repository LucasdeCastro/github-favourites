import {
  SET_ERROR,
  FETCH_REPO_PAGE,
  FETCH_REPO_DATA,
  FETCH_REPO_DATA_FAIL,
  FETCH_REPO_PAGE_SUCCESS,
  FETCH_REPO_DATA_SUCCESS
} from "../utils/actions";
import { BASE_URL } from "../utils/constants";

export function fetchRepo(lang, page) {
  return async dispatch => {
    if (page === 1) {
      dispatch({ type: FETCH_REPO_DATA });
    } else {
      dispatch({ type: FETCH_REPO_PAGE });
    }

    const type = page === 1 ? FETCH_REPO_DATA_SUCCESS : FETCH_REPO_PAGE_SUCCESS;

    const response = await fetch(`${BASE_URL}${lang}&page=${page}`);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type, payload: { ...data, page } });
    } else {
      dispatch({ type: FETCH_REPO_DATA_FAIL });
      dispatch({
        type: SET_ERROR,
        payload: "Falha na requisição, Error:  " + data.message
      });
    }
  };
}
