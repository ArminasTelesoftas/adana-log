import React from "react";
import { match } from "react-router-dom";
import { useAppSelector } from "../../App.reducer";
import { TimeEntrySummaryTable } from "../organisms/TimeEntrySummaryTable";
import { Container } from "../atoms/Container";
import { Box } from "@material-ui/core";

interface ProjectSummaryProps {
  match: match;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = () => {
  const state = useAppSelector((state) => state);

  return (
    <Container>
      <Box pb={10} pt={5}>
        <TimeEntrySummaryTable timeEntries={state.project.timeEntries} />
      </Box>
    </Container>
  );
};
