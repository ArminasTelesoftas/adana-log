import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../App.reducer";
import { Action } from "redux";
import { loginAction, loginFailureAction, loginSuccessAction } from "./actions";
import { api } from "../../../index";

export const loginEffect = (
  login: string,
  password: string
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  dispatch(loginAction());

  try {
    const response = await api.login({
      login,
      password,
    });
    dispatch(loginSuccessAction(response.user));
  } catch (e) {
    console.log(e)
    dispatch(loginFailureAction());
    throw e;
  }
};
