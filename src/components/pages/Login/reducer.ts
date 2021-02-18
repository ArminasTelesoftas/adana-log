import {
  ActionTypes,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actions.types";
import { User } from "../../../types/models";

interface LoginState {
  user?: User;
}

const loginInitialState: LoginState = {};

export const loginReducer = (
  state: LoginState = loginInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        user: undefined,
      };
    }

    case LOGOUT: {
      return loginInitialState;
    }

    default:
      return state;
  }
};
