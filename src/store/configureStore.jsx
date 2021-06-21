import { createBrowserHistory } from "history";
import {createStore} from "redux";
import RootReducer from "../reducers/index.js";


export const history = createBrowserHistory();

export function configureStore(initialState) {
  return createStore(RootReducer, initialState);
}
