import {
  ActionTypes,
  DELETE_REMINDER_SUCCESS,
  GET_REMINDERS_SUCCESS,
  PATCH_REMINDER_SUCCESS,
  POST_REMINDER_SUCCESS,
} from "./actions.types";
import { Reminder } from "../../../types/models";

interface RemindersState {
  reminders: Reminder[];
}

const remindersInitialState: RemindersState = {
  reminders: [],
};

export const remindersReducer = (
  state: RemindersState = remindersInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case GET_REMINDERS_SUCCESS: {
      return {
        ...state,
        reminders: action.reminders,
      };
    }

    case POST_REMINDER_SUCCESS: {
      return {
        ...state,
        reminders: [action.reminder, ...state.reminders],
      };
    }

    case PATCH_REMINDER_SUCCESS: {
      return {
        ...state,
        reminders: state.reminders.map((el) =>
          el.id === action.reminder.id ? action.reminder : el
        ),
      };
    }

    case DELETE_REMINDER_SUCCESS: {
      return {
        ...state,
        reminders: state.reminders.filter((el) => el.id !== action.id),
      };
    }

    default:
      return state;
  }
};
