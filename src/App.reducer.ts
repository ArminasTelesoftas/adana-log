import {
  TypedUseSelectorHook,
  useDispatch as useDispatchGeneric,
  useSelector as useSelectorGeneric,
} from "react-redux";
import { AnyAction, combineReducers, Dispatch, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";

import { loginReducer } from "./components/pages/Login/reducer";
import { projectsReducer } from "./components/pages/Projects/reducer";
import {drawerReducer} from "./components/pages/Drawer/reducer";
import {projectReducer} from "./components/pages/Project/reducer";
import { remindersReducer } from "./components/pages/Reminders/reducer";

type TDispatch<R> = (action: ThunkAction<R, AppState, void, AnyAction>) => R;
export type AppDispatch = Dispatch;
export type AppDispatchEffect = TDispatch<Promise<any | AnyAction>>;
export const useAppDispatch: () => AppDispatch = useDispatchGeneric;
export const useAppDispatchEffect: () => AppDispatchEffect = useDispatchGeneric;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelectorGeneric;

export const rootReducers = {
  login: loginReducer,
  projects: projectsReducer,
  reminders: remindersReducer,
  project: projectReducer,
  drawer: drawerReducer
};

export const createRootReducer = (): Reducer => {
  const appReducer = combineReducers({
    ...rootReducers,
  });
  return (state: AppState, action: AnyAction) => {
    return appReducer(state, action);
  };
};

const rootReducerType = combineReducers({
  ...rootReducers,
});

export type AppState = ReturnType<typeof rootReducerType>;
