import {
  ActionTypes,
  DELETE_REMINDER_SUCCESS,
  GET_REMINDERS_SUCCESS,
  PATCH_REMINDER_SUCCESS,
  POST_REMINDER_SUCCESS,
} from "./actions.types";
import { Reminder } from "../../../types/models";

export const getRemindersSuccessAction = (reminders: Reminder[]): ActionTypes => ({
  type: GET_REMINDERS_SUCCESS,
  reminders,
});

export const postReminderSuccessAction = (reminder: Reminder): ActionTypes => ({
  type: POST_REMINDER_SUCCESS,
  reminder,
});

export const deleteReminderSuccessAction = (id: string): ActionTypes => ({
  type: DELETE_REMINDER_SUCCESS,
  id,
});

export const patchReminderSuccessAction = (reminder: Reminder): ActionTypes => ({
  type: PATCH_REMINDER_SUCCESS,
  reminder,
});
