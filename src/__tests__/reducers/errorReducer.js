import { CLEAR_ERROR, SET_ERROR } from "../../utils/actions";
import error from "../../reducers/errorReducer";

describe("[errorReducer]", () => {
  test("try add a error", () => {
    const state = error(undefined, { type: SET_ERROR, payload: "my error" });

    expect(state).toEqual({
      error: true,
      errorMessage: "my error"
    });
  });

  test("try clear error", () => {
    const state = error(undefined, { type: CLEAR_ERROR });

    expect(state).toEqual({
      error: false,
      errorMessage: ""
    });
  });

  test("try start without match action", () => {
    const state = error(undefined, { type: "START_REPO" });

    expect(state).toEqual({
      error: false,
      errorMessage: ""
    });
  });
});
