import {
  ActionTypes,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actions.types";
import { User } from "../../../types/models";

export const loginAction = (): ActionTypes => ({
  type: LOGIN,
});

export const loginSuccessAction = (user: User): ActionTypes => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailureAction = (): ActionTypes => ({
  type: LOGIN_FAILURE,
});

export const logoutAction = (): ActionTypes => ({
  type: LOGOUT,
});
