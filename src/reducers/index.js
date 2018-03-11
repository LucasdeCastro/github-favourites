import { combineReducers } from "redux";
import langReducer from "./langReducer";
import repoReducer from "./repoReducer";
import favouriteReducer from "./favouriteReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  lang: langReducer,
  repo: repoReducer,
  error: errorReducer,
  favourite: favouriteReducer
});
