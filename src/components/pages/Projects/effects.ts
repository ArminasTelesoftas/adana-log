import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../App.reducer";
import { Action } from "redux";
import { getProjectsSuccessAction } from "./actions";
import { api } from "../../../index";

export const getProjectsEffect = (): ThunkAction<
  Promise<void>,
  AppState,
  void,
  Action<string>
> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.getProjects();
    dispatch(getProjectsSuccessAction(response.projects));
  } catch (e) {
    throw e;
  }
};
