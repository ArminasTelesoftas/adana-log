import { Issue, Project, Template, TimeEntry } from "../../../types/models";
import { TimeEntryPatch } from "../../../types/api";
import { DateRange } from "../../../types/types";

export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const POST_TIME_ENTRY_SUCCESS = "POST_TIME_ENTRY_SUCCESS";
export const POST_MULTIPLE_TIME_ENTRY_SUCCESS = "POST_MULTIPLE_TIME_ENTRY_SUCCESS";
export const PATCH_TIME_ENTRY_SUCCESS = "PATCH_TIME_ENTRY_SUCCESS";
export const DELETE_TIME_ENTRY_SUCCESS = "DELETE_TIME_ENTRY_SUCCESS";
export const GET_TIME_ENTRIES_SUCCESS = "GET_TIME_ENTRIES_SUCCESS";
export const GET_PROJECT_ISSUES_SUCCESS = "GET_PROJECT_ISSUES_SUCCESS";
export const UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER = "UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER";
export const GET_TEMPLATES_SUCCESS = "GET_TEMPLATES_SUCCESS";
export const PATCH_TEMPLATE_SUCCESS = "PATCH_TEMPLATE_SUCCESS";
export const DELETE_TEMPLATE_SUCCESS = "DELETE_TEMPLATE_SUCCESS";

export interface DeleteTemplateSuccessAction {
  type: typeof DELETE_TEMPLATE_SUCCESS;
  id: string;
}

export interface GetTemplatesSuccessAction {
  type: typeof GET_TEMPLATES_SUCCESS;
  templates: Template[];
}

export interface PatchTemplateSuccessAction {
  type: typeof PATCH_TEMPLATE_SUCCESS;
  template: Template;
}

export interface GetProjectSuccessAction {
  type: typeof GET_PROJECT_SUCCESS;
  project: Project;
}

export interface PostTimeEntrySuccessAction {
  type: typeof POST_TIME_ENTRY_SUCCESS;
  timeEntry: TimeEntry;
}

export interface PostMultipleTimeEntrySuccessAction {
  type: typeof POST_MULTIPLE_TIME_ENTRY_SUCCESS;
  timeEntries: TimeEntry[];
}

export interface PatchTimeEntrySuccessAction {
  type: typeof PATCH_TIME_ENTRY_SUCCESS;
  timeEntryId: number;
  patchData: TimeEntryPatch;
}

export interface DeleteTimeEntrySuccessAction {
  type: typeof DELETE_TIME_ENTRY_SUCCESS;
  timeEntryId: number;
}

export interface GetTimeEntriesSuccessAction {
  type: typeof GET_TIME_ENTRIES_SUCCESS;
  timeEntries: TimeEntry[];
}

export interface GetProjectIssuesSuccessAction {
  type: typeof GET_PROJECT_ISSUES_SUCCESS;
  issues: Issue[];
}

export interface UpdateTimeEntriesDateRangeFilterAction {
  type: typeof UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER;
  dateRange: DateRange;
}

export type ActionTypes =
  | GetProjectSuccessAction
  | PostTimeEntrySuccessAction
  | PatchTimeEntrySuccessAction
  | DeleteTimeEntrySuccessAction
  | GetTimeEntriesSuccessAction
  | GetProjectIssuesSuccessAction
  | UpdateTimeEntriesDateRangeFilterAction
  | PostMultipleTimeEntrySuccessAction
  | GetTemplatesSuccessAction
  | PatchTemplateSuccessAction | DeleteTemplateSuccessAction;
