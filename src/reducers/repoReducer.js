import {
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_PAGE_SUCCESS,
  FETCH_REPO_DATA
} from "../utils/actions";

const initialState = {
  page: 1,
  data: [],
  total: 0,
  loading: false
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_REPO_DATA:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_REPO_DATA_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        page: ++payload.page,
        total: payload.total_count,
        data: [].concat(payload.items)
      });
    case FETCH_REPO_PAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        page: ++payload.page,
        total: payload.total_count,
        data: state.data.concat(payload.items)
      });
    default:
      return state;
  }
}
