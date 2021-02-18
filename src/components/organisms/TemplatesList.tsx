import React, { ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppDispatchEffect } from "../../App.reducer";
import { Issue, Template } from "../../types/models";
import { IdName } from "../../types/types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, Radio, Typography } from "@material-ui/core";
import { deleteTemplatesEffect, patchTemplatesEffect } from "../pages/Project/effects";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(5),
    },
  })
);

interface TemplatesListProps {
  dispatchEffect: AppDispatchEffect;
  templates: Template[];
  activities: IdName[];
  issues: Issue[];
}

export const TemplatesList: React.FC<TemplatesListProps> = ({
  dispatchEffect,
  templates,
  activities,
  issues,
}) => {
  const classes = useStyles();

  const handleDelete = (template: Template) => {
    dispatchEffect(deleteTemplatesEffect(template));
  };

  const handleDefaultChange = (event: ChangeEvent<HTMLInputElement>, template: Template) => {
    dispatchEffect(patchTemplatesEffect(template.id, event.target.checked));
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Default</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template, i) => {
            const { title, activityId, issueId, comments, hours, isDefault, id } = template;
            const issue = issues.find((el) => el.id === issueId);
            return (
              <TableRow key={id}>
                <TableCell scope="row">{title}</TableCell>
                <TableCell>{activities.find((el) => el.id === activityId)?.name}</TableCell>
                <TableCell>
                  <Typography>{issue?.subject}</Typography>
                  <Typography color="textSecondary">#{issue?.id}</Typography>
                </TableCell>
                <TableCell>{comments}</TableCell>
                <TableCell>{hours}</TableCell>
                <TableCell scope="row">
                  <Radio
                    color="primary"
                    checked={isDefault}
                    onChange={(event) => handleDefaultChange(event, template)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(template)}>
                    <DeleteIcon color="action" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
