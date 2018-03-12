import {
  FETCH_REPO_DATA_FAIL,
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_PAGE_SUCCESS,
  FETCH_REPO_DATA
} from "../../utils/actions";
import repo from "../../reducers/repoReducer";

describe("[repoReducer]", () => {
  test("try FETCH_REPO_DATA", () => {
    const initial = {
      page: 1,
      data: [],
      total: 0,
      loading: false,
      hasError: false
    };

    const state = repo(initial, {
      type: FETCH_REPO_DATA
    });

    expect(state).toEqual({
      page: 1,
      data: [],
      total: 0,
      loading: true,
      hasError: false
    });
  });

  test("try FETCH_REPO_DATA_SUCCESS", () => {
    const state = repo(undefined, {
      type: FETCH_REPO_DATA_SUCCESS,
      payload: {
        page: 1,
        items: [{ id: 1, name: "my repo" }],
        total_count: 1
      }
    });

    expect(state).toEqual({
      page: 2,
      total: 1,
      loading: false,
      hasError: false,
      data: [{ id: 1, name: "my repo" }]
    });
  });

  test("try FETCH_REPO_DATA_SUCCESS", () => {
    const initial = {
      page: 2,
      total: 2,
      loading: false,
      hasError: false,
      data: [{ id: 1, name: "my repo" }]
    };

    const state = repo(initial, {
      type: FETCH_REPO_PAGE_SUCCESS,
      payload: {
        page: 2,
        items: [{ id: 2, name: "my repo 2" }],
        total_count: 2
      }
    });

    expect(state).toEqual({
      page: 3,
      total: 2,
      loading: false,
      hasError: false,
      data: [{ id: 1, name: "my repo" }, { id: 2, name: "my repo 2" }]
    });
  });

  test("try FETCH_REPO_DATA_FAIL", () => {
    const state = repo(undefined, {
      type: FETCH_REPO_DATA_FAIL
    });

    expect(state).toEqual({
      page: 1,
      data: [],
      total: 0,
      loading: false,
      hasError: true
    });
  });
});
