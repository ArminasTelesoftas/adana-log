import React, { useEffect } from "react";
import { useAppDispatch, useAppDispatchEffect, useAppSelector } from "../../../App.reducer";
import { match, useLocation, useParams } from "react-router-dom";
import { getProjectEffect, getProjectIssuesEffect, getTemplatesEffect } from "./effects";
import { TopBar } from "../../organisms/TopBar";
import { routes } from "../../../routes";
import { TabMenu } from "../../molecules/TabMenu";
import { FormLogMultipleTimeEntries } from "../../organisms/FormLogMultipleTimeEntries";
import { Box, Typography } from "@material-ui/core";
import { TimeEntriesFilter } from "../../organisms/TimeEntriesFilter";
import { updateTimeEntriesDateRangeFilterAction } from "./actions";
import { monthAgo, today } from "../../../utils";
import { FormCreateTemplate } from "../../organisms/FormCreateTemplate";

interface ProjectProps {
  match: match;
}

export const Project: React.FC<ProjectProps> = ({ match }) => {
  const dispatchEffect = useAppDispatchEffect();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { projectId: pId } = useParams<{ projectId: string }>();
  const projectId = Number(pId);
  const { timeEntriesDateRangeFilter, project, projectIssues } = state.project;
  const { pathname } = useLocation();
  const isTemplatesPage = pathname.includes("/templates");

  const tabs = [
    {
      label: "Calendar",
      link: routes.projectCalendar.path.replace(":projectId", pId),
    },
    {
      label: "Summary",
      link: routes.projectSummary.path.replace(":projectId", pId),
    },
    {
      label: "Templates",
      link: routes.projectTemplates.path.replace(":projectId", pId),
    },
  ];

  useEffect(() => {
    if (projectId) {
      dispatchEffect(getProjectEffect(projectId));
      dispatchEffect(getProjectIssuesEffect(projectId));
      dispatchEffect(getTemplatesEffect(projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    dispatch(
      updateTimeEntriesDateRangeFilterAction({
        startDate: monthAgo(),
        endDate: today(),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TopBar
      match={match}
      dispatch={dispatch}
      title="Project"
      appBarContent={
        <Box display="flex" flexDirection="column">
          <Box pl={4} pt={2} pb={2}>
            <Typography variant="h4">{project?.name}</Typography>
          </Box>
          <Box display="inline-flex" justifyContent="space-between" pr={2}>
            <TabMenu tabs={tabs} />
            {timeEntriesDateRangeFilter && (
              <TimeEntriesFilter
                dateRange={timeEntriesDateRangeFilter}
                onDateRangeChanged={(dateRange) =>
                  dispatch(updateTimeEntriesDateRangeFilterAction(dateRange))
                }
              />
            )}
          </Box>
        </Box>
      }
    >
      {project && isTemplatesPage ? (
        <FormCreateTemplate
          project={project}
          dispatchEffect={dispatchEffect}
          issues={projectIssues}
        />
      ) : (
        project && (
          <FormLogMultipleTimeEntries
            project={project}
            dispatchEffect={dispatchEffect}
            issues={projectIssues}
          />
        )
      )}
    </TopBar>
  );
};
