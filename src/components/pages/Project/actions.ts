import {
  ActionTypes,
  DELETE_TEMPLATE_SUCCESS,
  DELETE_TIME_ENTRY_SUCCESS,
  GET_PROJECT_ISSUES_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_TEMPLATES_SUCCESS,
  GET_TIME_ENTRIES_SUCCESS,
  PATCH_TEMPLATE_SUCCESS,
  PATCH_TIME_ENTRY_SUCCESS,
  POST_MULTIPLE_TIME_ENTRY_SUCCESS,
  POST_TIME_ENTRY_SUCCESS,
  UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER,
} from "./actions.types";
import { Issue, Project, Template, TimeEntry } from "../../../types/models";
import { TimeEntryPatch } from "../../../types/api";
import { DateRange } from "../../../types/types";

export const getProjectSuccessAction = (project: Project): ActionTypes => ({
  type: GET_PROJECT_SUCCESS,
  project,
});

export const postTimeEntrySuccessAction = (timeEntry: TimeEntry): ActionTypes => ({
  type: POST_TIME_ENTRY_SUCCESS,
  timeEntry,
});

export const postMultipleTimeEntrySuccessAction = (timeEntries: TimeEntry[]): ActionTypes => ({
  type: POST_MULTIPLE_TIME_ENTRY_SUCCESS,
  timeEntries,
});

export const patchTimeEntrySuccessAction = (
  timeEntryId: number,
  patchData: TimeEntryPatch
): ActionTypes => ({
  type: PATCH_TIME_ENTRY_SUCCESS,
  patchData,
  timeEntryId,
});

export const deleteTimeEntrySuccessAction = (timeEntryId: number): ActionTypes => ({
  type: DELETE_TIME_ENTRY_SUCCESS,
  timeEntryId,
});

export const getTimeEntriesSuccessAction = (timeEntries: TimeEntry[]): ActionTypes => ({
  type: GET_TIME_ENTRIES_SUCCESS,
  timeEntries,
});

export const getProjectIssuesSuccessAction = (issues: Issue[]): ActionTypes => ({
  type: GET_PROJECT_ISSUES_SUCCESS,
  issues,
});

export const updateTimeEntriesDateRangeFilterAction = (dateRange: DateRange): ActionTypes => ({
  type: UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER,
  dateRange,
});

export const getTemplatesSuccessAction = (templates: Template[]): ActionTypes => ({
  type: GET_TEMPLATES_SUCCESS,
  templates,
});

export const patchTemplateSuccessAction = (template: Template): ActionTypes => ({
  type: PATCH_TEMPLATE_SUCCESS,
  template,
});

export const deleteTemplateSuccessAction = (id: string): ActionTypes => ({
  type: DELETE_TEMPLATE_SUCCESS,
  id,
});
