import { REMOVE_FAVOURITE, ADD_FAVOURITE } from "../utils/actions";

const initialState = {
  data: [],
  loading: true
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAVOURITE:
      return Object.assign({}, state, {
        loading: false,
        data: state.data.concat(payload)
      });
    case REMOVE_FAVOURITE:
      return Object.assign({}, state, {
        loading: false,
        data: state.data.filter(e => e === payload)
      });
    default:
      return state;
  }
}
