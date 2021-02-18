import { Reminder } from "../../../types/models";

export const GET_REMINDERS_SUCCESS = "GET_REMINDERS_SUCCESS";
export const POST_REMINDER_SUCCESS = "POST_REMINDER_SUCCESS";
export const DELETE_REMINDER_SUCCESS = "DELETE_REMINDER_SUCCESS";
export const PATCH_REMINDER_SUCCESS = "PATCH_REMINDER_SUCCESS";

export interface GetRemindersSuccessAction {
  type: typeof GET_REMINDERS_SUCCESS;
  reminders: Reminder[];
}

export interface PostReminderSuccessAction {
  type: typeof POST_REMINDER_SUCCESS;
  reminder: Reminder;
}

export interface DeleteReminderSuccessAction {
  type: typeof DELETE_REMINDER_SUCCESS;
  id: string;
}

export interface PatchReminderSuccessAction {
  type: typeof PATCH_REMINDER_SUCCESS;
  reminder: Reminder;
}

export type ActionTypes =
  | GetRemindersSuccessAction
  | PostReminderSuccessAction
  | DeleteReminderSuccessAction
  | PatchReminderSuccessAction;
