import { setError, clearError } from "../../actions/errorActions";
import { CLEAR_ERROR, SET_ERROR } from "../../utils/actions";

describe("[errorActions]", () => {
  test("setError", () => {
    const error = "We have a problem";
    const dispatch = data => {
      expect(data).toEqual({ type: SET_ERROR, payload: error });
    };

    setError(error)(dispatch);
  });

  test("clearError", () => {
    const dispatch = data => {
      expect(data).toEqual({ type: CLEAR_ERROR });
    };

    clearError()(dispatch);
  });
});
