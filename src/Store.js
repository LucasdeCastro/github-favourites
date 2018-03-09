import thunk from "redux-thunk";
import reduces from "./reducers";
import { createStore, applyMiddleware } from "redux";
import customMiddleware from "./utils/customMiddleware";
import { SET_LANG, REMOVE_LANG } from "./utils/actions";

const middleware = customMiddleware([
  {
    action: SET_LANG,
    reducer: "lang"
  },
  {
    action: REMOVE_LANG,
    reducer: "lang"
  }
]);

const store = createStore(reduces, applyMiddleware(thunk, middleware));

export default store;
