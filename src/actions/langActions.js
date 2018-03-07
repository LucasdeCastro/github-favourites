import { SET_LANG, SELECT_LANG } from "../utils/actions";

export function addLang(lang) {
  return dispatch => {
    dispatch({ type: SET_LANG, payload: [lang] });
  };
}

export function selectLang(lang) {
  return dispatch => {
    dispatch({ type: SELECT_LANG, payload: lang });
  };
}
