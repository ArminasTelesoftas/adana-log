import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../App.reducer";
import { Action } from "redux";
import {
  deleteReminderSuccessAction,
  getRemindersSuccessAction,
  patchReminderSuccessAction,
  postReminderSuccessAction,
} from "./actions";
import { api } from "../../../index";
import { ReminderPost } from "../../../types/types";

export const getRemindersEffect = (): ThunkAction<
  Promise<void>,
  AppState,
  void,
  Action<string>
> => async (dispatch: ThunkDispatch<AppState, void, Action<string>>, getState: () => AppState) => {
  try {
    const response = await api.getReminders();
    dispatch(getRemindersSuccessAction(response.reminders));
  } catch (e) {
    throw e;
  }
};

export const postReminderEffect = (
  reminder: ReminderPost
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.postReminder(reminder);
    dispatch(postReminderSuccessAction(response.reminder));
  } catch (e) {
    throw e;
  }
};

export const deleteReminderEffect = (
  id: string
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    await api.deleteReminder(id);
    dispatch(deleteReminderSuccessAction(id));
  } catch (e) {
    throw e;
  }
};

export const patchReminderEffect = (
  reminder: ReminderPost
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.patchReminder(reminder);
    dispatch(patchReminderSuccessAction(response.reminder));
  } catch (e) {
    throw e;
  }
};
