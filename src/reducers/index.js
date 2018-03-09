import { combineReducers } from "redux";
import langReducer from "./langReducer";
import repoReducer from "./repoReducer";
import favouriteReducer from "./favouriteReducer";

export default combineReducers({
  lang: langReducer,
  repo: repoReducer,
  favourite: favouriteReducer
});
