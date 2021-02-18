import { ActionTypes, GET_PROJECTS_SUCCESS } from "./actions.types";
import { Project } from "../../../types/models";

export const getProjectsSuccessAction = (projects: Project[]): ActionTypes => ({
  type: GET_PROJECTS_SUCCESS,
  projects,
});
