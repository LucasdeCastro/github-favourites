import {
  FETCH_REPO_DATA,
  FETCH_REPO_PAGE,
  FETCH_REPO_DATA_FAIL,
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_PAGE_SUCCESS
} from "../utils/actions";

const initialState = {
  page: 1,
  data: [],
  total: 0,
  loading: true,
  hasError: false
};

export default function langReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_REPO_DATA:
      return Object.assign({}, state, {
        data: [],
        loading: true,
        hasError: false
      });
    case FETCH_REPO_PAGE:
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
    case FETCH_REPO_DATA_FAIL:
      return Object.assign({}, state, {
        loading: false,
        hasError: true
      });
    default:
      return state;
  }
}
