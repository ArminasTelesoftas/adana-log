export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface IdName {
  id: number;
  name: string;
}

export interface TemplatePost {
  projectId: number;
  title: string;
  isDefault: boolean;
  issueId?: number
  activityId: number;
  hours?: number;
  comments?: string;
}

export interface ReminderPost {
  name: string;
  time: string;
  active: boolean;
}

export interface UpdateInfo {
  version: string;
  files: unknown[];
  releaseDate: string;
  releaseName: string;
  releaseNotes: string
}
