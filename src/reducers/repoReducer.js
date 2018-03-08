import { FETCH_DATA_SUCCESS, FETCH_DATA } from "../utils/actions";

const initialState = {
  page: 1,
  data: [],
  total: 0,
  loading: false
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(payload.items),
        total: payload.total_count,
        loading: false
      });
    default:
      return state;
  }
}
