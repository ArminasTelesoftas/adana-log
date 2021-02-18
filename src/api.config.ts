import { AppState } from "./App.reducer";
import { Store } from "redux";
import { channels } from "./shared/constants";
import {
  AppVersionResponse,
  CheckForUpdatesResponse,
  DeleteReminderResponse,
  DeleteTemplateResponse,
  GetRemindersResponse,
  GetTemplatesResponse,
  GetTimeEntriesResponse,
  LoginRequest,
  LoginResponse,
  MultipleTimeEntryPost,
  PatchTemplatesResponse,
  PatchTimeEntryResponse,
  PostMultipleTimeEntryResponse,
  PostReminderResponse,
  PostTemplateResponse,
  PostTimeEntryResponse,
  ProjectIssuesResponse,
  ProjectResponse,
  ProjectsResponse,
  TimeEntryPatch,
} from "./types/api";
import { ReminderPost, TemplatePost } from "./types/types";

export class Api {
  store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  getApiKey() {
    return this.store.getState().login.user?.api_key;
  }

  getAppVersion: () => AppVersionResponse = () => {
    return window.api.invoke(channels.version);
  };

  checkForUpdates: () => CheckForUpdatesResponse = () => {
    return window.api.invoke(channels.checkForUpdates);
  };

  applyUpdateAndRestart: () => Promise<{}> = () => {
    return window.api.invoke(channels.restartApp);
  };

  login: (props: LoginRequest) => LoginResponse = ({ login, password }) => {
    return window.api.invoke(channels.authenticate, {
      login,
      password,
    });
  };

  logout() {
    return window.api.invoke(channels.logout);
  }

  getTimeEntries: (data: {
    projectId: number;
    fromDate: string;
    toDate: string;
  }) => GetTimeEntriesResponse = (data) => {
    return window.api.invoke(channels.getTimeEntries, {
      apiKey: this.getApiKey(),
      ...data,
    });
  };

  getProjects: () => ProjectsResponse = () => {
    return window.api.invoke(channels.getProjects, {
      apiKey: this.getApiKey(),
    });
  };

  getProject: (projectId: number) => ProjectResponse = (projectId) => {
    return window.api.invoke(channels.getProject, {
      apiKey: this.getApiKey(),
      projectId,
    });
  };

  getProjectIssues: (projectId: number) => ProjectIssuesResponse = (projectId) => {
    return window.api.invoke(channels.getProjectIssues, {
      apiKey: this.getApiKey(),
      projectId,
    });
  };

  postTimeEntry: (data: TimeEntryPatch) => PostTimeEntryResponse = (data) => {
    return window.api.invoke(channels.postTimeEntry, {
      apiKey: this.getApiKey(),
      data: {
        project_id: data.projectId,
        hours: data.hours,
        date: data.date,
        activity_id: data.activityId,
        comments: data.comments,
        issue_id: data.issueId,
      },
    });
  };

  postMultipleTimeEntry: (data: MultipleTimeEntryPost) => PostMultipleTimeEntryResponse = (
    data
  ) => {
    return window.api.invoke(channels.postMultipleTimeEntry, {
      apiKey: this.getApiKey(),
      data: {
        project_id: data.projectId,
        hours: data.hours,
        dates: data.dates,
        activity_id: data.activityId,
        comments: data.comments,
        issue_id: data.issueId,
      },
    });
  };

  patchTimeEntry: (timeEntryId: number, data: TimeEntryPatch) => PatchTimeEntryResponse = (
    timeEntryId,
    data
  ) => {
    return window.api.invoke(channels.patchTimeEntry, {
      apiKey: this.getApiKey(),
      timeEntryId,
      data: {
        project_id: data.projectId,
        hours: data.hours,
        date: data.date,
        activity_id: data.activityId,
        comments: data.comments || "",
        issue_id: data.issueId || null,
      },
    });
  };

  deleteTimeEntry: (timeEntryId: number) => ProjectIssuesResponse = (timeEntryId) => {
    return window.api.invoke(channels.deleteTimeEntry, {
      apiKey: this.getApiKey(),
      timeEntryId,
    });
  };

  postTemplate: (data: TemplatePost) => PostTemplateResponse = async (data) => {
    return await window.api.invoke(channels.postTimeEntryTemplate, { data });
  };

  getTemplates: (projectId: number) => GetTemplatesResponse = async (projectId) => {
    return window.api.invoke(channels.getTimeEntryTemplates, { projectId });
  };

  patchTemplate: (templateId: string, isDefault: boolean) => PatchTemplatesResponse = async (
    templateId,
    isDefault
  ) => {
    return window.api.invoke(channels.patchTimeEntryTemplate, { templateId, isDefault });
  };

  deleteTemplate: (templateId: string) => DeleteTemplateResponse = async (templateId) => {
    return window.api.invoke(channels.deleteTimeEntryTemplate, { templateId });
  };

  getReminders: () => GetRemindersResponse = async () => {
    return window.api.invoke(channels.getReminders);
  };

  postReminder: (data: ReminderPost) => PostReminderResponse = async (data) => {
    return window.api.invoke(channels.postReminder, { data });
  };

  patchReminder: (data: ReminderPost) => PostReminderResponse = async (data) => {
    return window.api.invoke(channels.patchReminder, { data });
  };

  deleteReminder: (reminderId: string) => DeleteReminderResponse = async (reminderId) => {
    return window.api.invoke(channels.deleteReminder, { reminderId });
  };
}
