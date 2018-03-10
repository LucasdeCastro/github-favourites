import { FAVOURITE } from "../utils/constants";
import { LOAD_FROM_LOCALSTORE } from "../utils/customMiddleware";
import { SET_LANG, SELECT_LANG, REMOVE_LANG } from "../utils/actions";
const initialState = {
  data: [FAVOURITE],
  loading: true,
  selected: null
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_FROM_LOCALSTORE:
      return Object.assign({}, state, { ...payload.lang, loading: false });
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
