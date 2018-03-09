import { SET_LANG, SELECT_LANG, REMOVE_LANG } from "../utils/actions";

export function addLang(lang) {
  return dispatch => {
    lang = lang.toLowerCase();
    dispatch({ type: SET_LANG, payload: [lang] });
  };
}

export function selectLang(lang) {
  return dispatch => {
    lang = lang.toLowerCase();
    dispatch({ type: SELECT_LANG, payload: lang });
  };
}

export function removeLang(lang) {
  return dispatch => {
    dispatch({ type: REMOVE_LANG, payload: lang });
  };
}
