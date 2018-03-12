import thunk from "redux-thunk";
import reduces from "./reducers";
import { createStore, applyMiddleware } from "redux";
import customMiddleware from "./utils/customMiddleware";
import {
  SET_LANG,
  SELECT_LANG,
  REMOVE_LANG,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE
} from "./utils/actions";
import { FAVOURITE, LANG } from "./utils/constants";

const middleware = customMiddleware([
  {
    actions: [SET_LANG, REMOVE_LANG, SELECT_LANG],
    reducer: LANG,
    local: true
  },
  {
    actions: [ADD_FAVOURITE, REMOVE_FAVOURITE],
    reducer: FAVOURITE
  }
]);

const store = createStore(reduces, applyMiddleware(thunk, middleware));

export default store;
