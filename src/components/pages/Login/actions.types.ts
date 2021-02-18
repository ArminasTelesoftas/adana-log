import { User } from "../../../types/models";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";

export interface LoginAction {
  type: typeof LOGIN;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  user: User;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type ActionTypes = LoginAction | LoginSuccessAction | LoginFailureAction | LogoutAction;
