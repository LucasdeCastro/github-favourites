import { combineReducers } from "redux";
import langReducer from "./langReducer";
import repoReducer from "./repoReducer";

export default combineReducers({
  lang: langReducer,
  repo: repoReducer
});
