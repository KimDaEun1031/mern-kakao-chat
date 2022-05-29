import { combineReducers, createStore } from "redux";
import { chatReducer, toggleReducer } from "../features/chat";

const reducer = combineReducers({
  chatReducer,
  toggleReducer,
});

const store = createStore(reducer);

export default store;