import { CLEAR_ERROR, SET_ERROR } from "../utils/actions";

const initialState = {
  error: false,
  errorMessage: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        error: false,
        errorMessage: ""
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        error: true,
        errorMessage: payload
      });
    default:
      return state;
  }
}
