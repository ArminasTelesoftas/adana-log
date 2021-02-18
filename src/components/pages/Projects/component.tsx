import React, { useEffect } from "react";
import { useAppDispatch, useAppDispatchEffect, useAppSelector } from "../../../App.reducer";
import { getProjectsEffect } from "./effects";
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { Link, match } from "react-router-dom";
import { TopBar } from "../../organisms/TopBar";

interface ProjectsProps {
  match: match;
}

export const Projects: React.FC<ProjectsProps> = ({ match }) => {
  const dispatchEffect = useAppDispatchEffect();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    try {
      dispatchEffect(getProjectsEffect());
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TopBar match={match} dispatch={dispatch} title="Projects">
      <Box pt={3} pb={3}>
        <Paper elevation={4}>
          <List>
            {state.projects.projects.map((el, index) => (
              <ListItem button key={el.id} component={Link} to={`/projects/${el.id}/calendar`}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={el.name} secondary={el.description} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </TopBar>
  );
};
