import { SET_LANG, SELECT_LANG, REMOVE_LANG } from "../utils/actions";
import { LOAD_FROM_FIREBASE } from "../utils/customMiddleware";
const initialState = {
  data: [],
  loading: true,
  selected: null
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_FROM_FIREBASE:
      return Object.assign({}, state, { ...payload, loading: false });
    case REMOVE_LANG:
      return Object.assign({}, state, {
        data: state.data.filter(e => e !== payload),
        selected: state.selected === payload ? null : state.selected
      });
    case SET_LANG:
      return Object.assign({}, state, {
        loading: false,
        data: state.data.concat(payload),
        selected: state.selected === null ? payload[0] : state.selected
      });
    case SELECT_LANG:
      return Object.assign({}, state, {
        selected: payload
      });
    default:
      return state;
  }
}
