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
import { DateRange } from "../../../types/types";

interface ProjectState {
  project?: Project;
  timeEntries: TimeEntry[];
  projectIssues: Issue[];
  timeEntriesDateRangeFilter?: DateRange;
  templates: Template[];
}

const projectInitialState: ProjectState = {
  timeEntries: [],
  projectIssues: [],
  templates: [],
};

export const projectReducer = (state: ProjectState = projectInitialState, action: ActionTypes) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.project,
      };
    }

    case GET_TIME_ENTRIES_SUCCESS: {
      return {
        ...state,
        timeEntries: action.timeEntries,
      };
    }

    case POST_TIME_ENTRY_SUCCESS: {
      return {
        ...state,
        timeEntries: [action.timeEntry, ...state.timeEntries],
      };
    }

    case DELETE_TIME_ENTRY_SUCCESS: {
      return {
        ...state,
        timeEntries: state.timeEntries.filter((el) => el.id !== action.timeEntryId),
      };
    }

    case GET_PROJECT_ISSUES_SUCCESS: {
      return {
        ...state,
        projectIssues: action.issues,
      };
    }

    case PATCH_TIME_ENTRY_SUCCESS: {
      const updatedActivity = state.project?.time_entry_activities?.find(
        (el) => el.id === action.patchData.activityId
      );
      const updatedIssue = state.projectIssues.find((el) => el.id === action.patchData.issueId);

      const timeEntries: TimeEntry[] = state.timeEntries.map((el) =>
        el.id === action.timeEntryId
          ? {
              ...el,
              activity: updatedActivity || el.activity,
              issue: updatedIssue,
              hours: action.patchData.hours || el.hours,
              comments: action.patchData.comments || "",
            }
          : el
      );

      return {
        ...state,
        timeEntries,
      };
    }

    case UPDATE_TIME_ENTRIES_DATE_RANGE_FILTER: {
      return {
        ...state,
        timeEntriesDateRangeFilter: action.dateRange,
      };
    }

    case POST_MULTIPLE_TIME_ENTRY_SUCCESS: {
      return {
        ...state,
        timeEntries: [...action.timeEntries, ...state.timeEntries],
      };
    }

    case GET_TEMPLATES_SUCCESS: {
      return {
        ...state,
        templates: action.templates,
      };
    }

    case PATCH_TEMPLATE_SUCCESS: {
      return {
        ...state,
        templates: state.templates.map((el) =>
          el.id === action.template.id
            ? action.template
            : { ...el, isDefault: action.template.isDefault ? false : el.isDefault }
        ),
      };
    }
    case DELETE_TEMPLATE_SUCCESS: {
      return {
        ...state,
        templates: state.templates.filter((el) => el.id !== action.id),
      };
    }

    default:
      return state;
  }
};
