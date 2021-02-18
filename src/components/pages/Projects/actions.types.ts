import { Project } from "../../../types/models";

export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";

export interface GetProjectsSuccessAction {
  type: typeof GET_PROJECTS_SUCCESS;
  projects: Project[];
}

export type ActionTypes = GetProjectsSuccessAction;
