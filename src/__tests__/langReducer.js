import { FAVOURITE } from "../utils/constants";
import { LOAD_FROM_LOCALSTORE } from "../utils/customMiddleware";
import { SET_LANG, SELECT_LANG, REMOVE_LANG } from "../utils/actions";
import langReducer from "../reducers/langReducer";

describe("[langReducer]", () => {
  test("try start reducer without match action", () => {
    const start = langReducer(undefined, { type: "START_REPO" });

    expect(start).toEqual({
      data: [FAVOURITE],
      loading: true,
      selected: null
    });
  });

  test("try start reducer with state", () => {
    const state = {
      data: [FAVOURITE, "java", "javascript"],
      loading: false,
      selected: "java"
    };

    const start = langReducer(state, { type: "START_REPO" });

    expect(start).toEqual(state);
  });

  test("try add new lang", () => {
    const start = langReducer(undefined, { type: SET_LANG, payload: ["java"] });

    expect(start).toEqual({
      data: [FAVOURITE, "java"],
      loading: false,
      selected: "java"
    });
  });

  test("try add list of lang's", () => {
    const start = langReducer(undefined, {
      type: SET_LANG,
      payload: ["java", "javascript", "python"]
    });

    expect(start).toEqual({
      data: [FAVOURITE, "java", "javascript", "python"],
      loading: false,
      selected: "java"
    });
  });

  test("try select the favourite", () => {
    const start = langReducer(undefined, {
      type: SELECT_LANG,
      payload: FAVOURITE
    });

    expect(start).toEqual({
      data: [FAVOURITE],
      loading: true,
      selected: FAVOURITE
    });
  });

  test("try remove the favourite", () => {
    const start = langReducer(undefined, {
      type: REMOVE_LANG,
      payload: FAVOURITE
    });

    expect(start).toEqual({
      data: [FAVOURITE],
      loading: true,
      selected: null
    });
  });

  test("try load from localStore without key", () => {
    const start = langReducer(undefined, {
      type: LOAD_FROM_LOCALSTORE,
      payload: {}
    });

    expect(start).toEqual({
      data: [FAVOURITE],
      loading: false,
      selected: null
    });
  });

  test("try select some invalid lang", () => {
    const start = langReducer(undefined, {
      type: SELECT_LANG,
      payload: "java"
    });

    expect(start).toEqual({
      data: [FAVOURITE],
      loading: true,
      selected: null
    });
  });
});
