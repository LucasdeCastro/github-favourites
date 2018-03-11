import favourite from "../reducers/favouriteReducer";
import { REMOVE_FAVOURITE, ADD_FAVOURITE } from "../utils/actions";
import { LOAD_FROM_FIREBASE } from "../utils/customMiddleware";

describe("[favouriteReducer]", () => {
  test("try start reducer without match action", () => {
    const start = favourite(undefined, { type: "START_REPO" });

    expect(start).toEqual({
      data: [],
      keys: {},
      loading: true
    });
  });

  test("try load from firebase without key", () => {
    const start = favourite(undefined, {
      type: LOAD_FROM_FIREBASE,
      payload: {}
    });

    expect(start).toEqual({
      data: [],
      keys: {},
      loading: false
    });
  });

  test("try load from firebase with key", () => {
    const start = favourite(undefined, {
      type: LOAD_FROM_FIREBASE,
      payload: { favourite: { data: [{ id: 1 }] } }
    });

    expect(start).toEqual({
      data: [{ id: 1 }],
      keys: {},
      loading: false
    });
  });

  test("try add new favourite", () => {
    const start = favourite(undefined, {
      type: ADD_FAVOURITE,
      payload: [{ id: 1, name: "React" }]
    });

    expect(start).toEqual({
      data: [{ id: 1, name: "React" }],
      keys: { 1: true },
      loading: false
    });
  });

  test("try remove a favourite", () => {
    const start = favourite(undefined, {
      type: ADD_FAVOURITE,
      payload: [{ id: 1, name: "React" }]
    });

    const result = favourite(start, {
      type: REMOVE_FAVOURITE,
      payload: { id: 1 }
    });

    expect(result).toEqual({
      data: [],
      keys: {},
      loading: false
    });
  });

  test("try start with state", () => {
    const state = {
      data: [{ id: 1, name: "React" }],
      keys: { 1: true },
      loading: false
    };

    const start = favourite(
      {
        data: [{ id: 1, name: "React" }],
        keys: { 1: true },
        loading: false
      },
      { type: "START" }
    );

    expect(start).toEqual(state);
  });
});
