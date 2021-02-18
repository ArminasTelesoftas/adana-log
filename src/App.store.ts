import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import ReduxThunk from "redux-thunk";
import { AppState, createRootReducer } from "./App.reducer";

const configureStore = (
  preloadedState?: AppState
): Store<AppState, AnyAction> =>
  createStore(createRootReducer(), preloadedState, applyMiddleware(ReduxThunk));

export const appStore = configureStore();
