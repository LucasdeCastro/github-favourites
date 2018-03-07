import thunk from "redux-thunk";
import reduces from "./reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(reduces, applyMiddleware(thunk));

export default store;
