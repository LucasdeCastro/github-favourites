import { SET_LANG, SELECT_LANG } from "../utils/actions";

const initialState = {
  data: ["Java", "JavaScript", "Python", "PHP"],
  selected: null
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LANG:
      return Object.assign({}, state, {
        data: state.data.concat(payload),
        selected: state.selected == null ? state.data[0] : state.selected
      });
    case SELECT_LANG:
      console.log(SELECT_LANG, payload);
      return Object.assign({}, state, {
        selected: payload
      });
    default:
      return state;
  }
}
