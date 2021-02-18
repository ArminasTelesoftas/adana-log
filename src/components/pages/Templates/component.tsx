import React from "react";
import { match } from "react-router-dom";
import { TemplatesList } from "../../organisms/TemplatesList";
import { Container } from "../../atoms/Container";
import { useAppDispatchEffect, useAppSelector } from "../../../App.reducer";

interface TemplatesProps {
  match: match;
}

export const Templates: React.FC<TemplatesProps> = () => {
  const dispatchEffect = useAppDispatchEffect();
  const state = useAppSelector((state) => state);
  const { project, projectIssues } = state.project;

  return (
    <Container>
      {project?.time_entry_activities && projectIssues ? (
        <TemplatesList
          dispatchEffect={dispatchEffect}
          activities={project.time_entry_activities}
          issues={projectIssues}
          templates={state.project.templates}
        />
      ) : (
        "loading..."
      )}
    </Container>
  );
};
