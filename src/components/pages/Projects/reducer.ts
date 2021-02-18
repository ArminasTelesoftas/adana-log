import { ActionTypes, GET_PROJECTS_SUCCESS } from "./actions.types";
import { Project } from "../../../types/models";

interface ProjectsState {
  projects: Project[];
}

const projectsInitialState: ProjectsState = {
  projects: [],
};

export const projectsReducer = (
  state: ProjectsState = projectsInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        projects: action.projects,
      };
    }

    default:
      return state;
  }
};
