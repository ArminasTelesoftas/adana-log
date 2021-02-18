import { IdName } from "./types";

export interface User {
  admin: boolean;
  api_key: string;
  created_on: string;
  firstname: string;
  id: number;
  last_login_on: string;
  lastname: string;
  login: string;
  mail: string;
}

export interface Project {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  created_on: string;
  updated_on: string;
  trackers?: IdName[];
  issue_categories?: unknown[];
  time_entry_activities?: IdName[];
  enabled_modules?: IdName[];
}

export interface Reminder {
  id: string;
  name: string;
  active: boolean;
  time: string; // "2020-12-02T06:24:05Z",
}

export interface TimeEntry {
  id: number;
  project: IdName;
  issue?: {
    id: number;
  };
  user: IdName;
  activity?: IdName;
  hours: number;
  comments: string;
  spent_on: string; // "2020-12-01",
  created_on: string; // "2020-12-02T06:24:05Z",
  updated_on: string; // "2020-12-02T06:24:05Z"
}

export interface Template {
  id: string;
  title: string;
  isDefault: boolean;
  projectId: number;
  issueId: number;
  activityId: number;
  hours?: number;
  comments?: string;
}

export interface Issue {
  id: number;
  project: IdName;
  tracker: IdName;
  status: IdName;
  priority: IdName;
  author: IdName;
  assigned_to: IdName;
  subject: string;
  description: string;
  start_date: string;
  due_date: string | null;
  done_ratio: number;
  is_private: boolean;
  estimated_hours: number | null;
  custom_fields: Array<unknown>;
  created_on: string;
  updated_on: string;
  closed_on?: string;
}
