import React, { useEffect } from "react";
import { match, useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import { useAppDispatchEffect, useAppSelector } from "../../App.reducer";
import { getTimeEntriesEffect } from "./Project/effects";
import { Container } from "../atoms/Container";
import { TimeEntriesCalendarList } from "../organisms/TimeEntriesCalendarList";
import { format } from "date-fns";

interface ProjectCalendarProps {
  match: match;
}

export const ProjectCalendar: React.FC<ProjectCalendarProps> = () => {
  const dispatchEffect = useAppDispatchEffect();
  const state = useAppSelector((state) => state);
  const { projectId: pId } = useParams<{ projectId: string }>();
  const projectId = Number(pId);
  const {
    project,
    timeEntriesDateRangeFilter,
    timeEntries,
    projectIssues,
    templates,
  } = state.project;

  useEffect(() => {
    if (projectId && timeEntriesDateRangeFilter) {
      const startDate = format(timeEntriesDateRangeFilter.startDate, "yyyy-MM-dd");
      const endDate = format(timeEntriesDateRangeFilter.endDate, "yyyy-MM-dd");
      dispatchEffect(getTimeEntriesEffect(projectId, startDate, endDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEntriesDateRangeFilter, projectId]);

  return (
    <Container>
      {project && projectId && timeEntriesDateRangeFilter ? (
        <Box pb={10} pt={5}>
          <TimeEntriesCalendarList
            project={project}
            issues={projectIssues}
            timeEntries={timeEntries}
            dispatchEffect={dispatchEffect}
            dateRange={timeEntriesDateRangeFilter}
            templates={templates}
          />
        </Box>
      ) : (
        <div>loading</div>
      )}
    </Container>
  );
};
