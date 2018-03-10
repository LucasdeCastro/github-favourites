import { REMOVE_FAVOURITE, ADD_FAVOURITE } from "../utils/actions";
import { LOAD_FROM_FIREBASE } from "../utils/customMiddleware";

const initialState = {
  data: [],
  keys: {},
  loading: true
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_FROM_FIREBASE:
      return Object.assign({}, state, { ...payload.favourite, loading: false });
    case ADD_FAVOURITE:
      return Object.assign({}, state, {
        loading: false,
        keys: { ...state.keys, [payload[0].id]: true },
        data: payload.concat(state.data)
      });
    case REMOVE_FAVOURITE:
      delete state.keys[payload.id];
      return Object.assign({}, state, {
        loading: false,
        data: state.data.filter(e => e.id !== payload.id)
      });
    default:
      return state;
  }
}
