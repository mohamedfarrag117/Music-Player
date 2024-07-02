import { applyMiddleware, createStore } from "redux";
import { trackReducer } from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(trackReducer, applyMiddleware(thunk));

export default store;
