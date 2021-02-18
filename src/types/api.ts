import { Issue, Project, Reminder, Template, TimeEntry, User } from "./models";
import { UpdateInfo } from "./types";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface TimeEntryPatch {
  date: string;
  hours: number;
  activityId: number;
  projectId: number;
  comments?: string;
  issueId?: number;
}

export interface MultipleTimeEntryPost extends Omit<TimeEntryPatch, "date"> {
  dates: string[];
}

export type LoginResponse = Promise<{ user: User }>;
export type AppVersionResponse = Promise<{ version: string }>;
export type CheckForUpdatesResponse = Promise<{ }>;
export type UpdateAvailableResponse = { update: UpdateInfo };
export type UpdateDownloadedResponse = { update: UpdateInfo };
export type ProjectsResponse = Promise<{ projects: Project[] }>;
export type GetTimeEntriesResponse = Promise<{ time_entries: TimeEntry[] }>;
export type ProjectResponse = Promise<{ project: Project }>;
export type ProjectIssuesResponse = Promise<{ issues: Issue[] }>;
export type PostTimeEntryResponse = Promise<{ time_entry: TimeEntry }>;
export type PostMultipleTimeEntryResponse = Promise<Array<{ time_entry: TimeEntry }>>;
export type PatchTimeEntryResponse = Promise<{ time_entry: TimeEntry }>;
export type PostTemplateResponse = Promise<{ template: Template }>;
export type GetTemplatesResponse = Promise<{ templates: Template[] }>;
export type PatchTemplatesResponse = Promise<{ template: Template }>;
export type DeleteTemplateResponse = Promise<{}>;

export type GetRemindersResponse = Promise<{ reminders: Reminder[] }>;
export type PostReminderResponse = Promise<{ reminder: Reminder }>;
export type PatchReminderResponse = Promise<{ reminder: Reminder }>;
export type DeleteReminderResponse = Promise<{}>;
