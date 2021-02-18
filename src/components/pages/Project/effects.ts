import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../App.reducer";
import { Action } from "redux";
import { api } from "../../../index";
import {
  deleteTemplateSuccessAction,
  deleteTimeEntrySuccessAction,
  getProjectIssuesSuccessAction,
  getProjectSuccessAction,
  getTemplatesSuccessAction,
  getTimeEntriesSuccessAction,
  patchTemplateSuccessAction,
  patchTimeEntrySuccessAction,
  postMultipleTimeEntrySuccessAction,
  postTimeEntrySuccessAction,
} from "./actions";
import { channels } from "../../../shared/constants";
import { MultipleTimeEntryPost, TimeEntryPatch } from "../../../types/api";
import { TemplatePost } from "../../../types/types";
import { Template } from "../../../types/models";

export const getProjectEffect = (
  projectId: number
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.getProject(projectId);
    dispatch(getProjectSuccessAction(response.project));
  } catch (e) {
    throw e;
  }
};

export const postTimeEntryEffect = (
  data: TimeEntryPatch
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.postTimeEntry(data);
    dispatch(postTimeEntrySuccessAction(response.time_entry));
  } catch (e) {
    throw e;
  }
};

export const postMultiTimeEntryEffect = (
  data: MultipleTimeEntryPost
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.postMultipleTimeEntry(data);
    const timeEntries = response.map((el) => el.time_entry);
    dispatch(postMultipleTimeEntrySuccessAction(timeEntries));
  } catch (e) {
    throw e;
  }
};

export const patchTimeEntryEffect = (
  timeEntryId: number,
  data: TimeEntryPatch
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    await api.patchTimeEntry(timeEntryId, data);
    dispatch(patchTimeEntrySuccessAction(timeEntryId, data));
  } catch (e) {
    throw e;
  }
};

export const deleteTimeEntryEffect = (
  timeEntryId: number
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    await api.deleteTimeEntry(timeEntryId);
    dispatch(deleteTimeEntrySuccessAction(timeEntryId));
  } catch (e) {
    throw e;
  }
};

export const getTimeEntriesEffect = (
  projectId: number,
  fromDate: string,
  toDate: string
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.getTimeEntries({
      projectId,
      fromDate,
      toDate,
    });
    dispatch(getTimeEntriesSuccessAction(response.time_entries));
  } catch (e) {
    throw e;
  }
};

export const getProjectIssuesEffect = (
  projectId: number
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.getProjectIssues(projectId);
    dispatch(getProjectIssuesSuccessAction(response.issues));
  } catch (e) {
    throw e;
  }
};

export const createTimeEntriesEffect = (
  dates: string[],
  hours: number,
  projectId: number
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const accessKey = getState().login.user?.api_key;
    await window.api.invoke(channels.createTimeEntries, accessKey, projectId, dates, hours);
  } catch (e) {
    throw e;
  }
};

export const createTemplateEffect = (
  data: TemplatePost
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    await api.postTemplate(data);
  } catch (e) {
    throw e;
  }
};

export const getTemplatesEffect = (
  projectId: number
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.getTemplates(projectId);
    dispatch(getTemplatesSuccessAction(response.templates));
  } catch (e) {
    throw e;
  }
};

export const patchTemplatesEffect = (
  templateId: string,
  isDefault: boolean
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    const response = await api.patchTemplate(templateId, isDefault);
    dispatch(patchTemplateSuccessAction(response.template));
  } catch (e) {
    throw e;
  }
};

export const deleteTemplatesEffect = (
  template: Template
): ThunkAction<Promise<void>, AppState, void, Action<string>> => async (
  dispatch: ThunkDispatch<AppState, void, Action<string>>,
  getState: () => AppState
) => {
  try {
    await api.deleteTemplate(template.id);
    dispatch(deleteTemplateSuccessAction(template.id));
  } catch (e) {
    throw e;
  }
};
