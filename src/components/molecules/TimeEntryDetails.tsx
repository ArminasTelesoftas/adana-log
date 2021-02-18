import React, { useState } from "react";
import { Issue, Project, Template, TimeEntry } from "../../types/models";
import { Box, Grid, IconButton } from "@material-ui/core";
import { EmptyTimeEntryState } from "../atoms/EmptyTimeEntryState";
import { TableList } from "../atoms/TableList";
import { TableListHead } from "../atoms/TableListHead";
import { TableListHeadCol } from "../atoms/TableListHeadCol";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormAddEntryRow } from "../organisms/FormAddEntryRow";
import { EntryRowView } from "./EntryRowView";
import { AppDispatchEffect } from "../../App.reducer";
import { deleteTimeEntryEffect } from "../pages/Project/effects";
import { FormEditEntryRow } from "../organisms/FormEditEntryRow";
import { TemplateSelect } from "./TemplateSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHeadAction: {
      position: "absolute",
      top: -12,
      right: 50,
      marginLeft: "auto",
      marginRight: "auto",
    },
    tableHeadSelectAction: {
      position: "absolute",
      top: -12,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
    },
  })
);

interface TimeEntryDetailsProps {
  timeEntries: TimeEntry[];
  issues: Issue[];
  dispatchEffect: AppDispatchEffect;
  date: string;
  project: Project;
  templates: Template[];
}

interface EntryType {
  id: number;
  activity: { value: number; label: string };
  comments: string;
  hours: number;
  issue?: Issue;
}

export const TimeEntryDetails: React.FC<TimeEntryDetailsProps> = ({
  timeEntries,
  issues,
  dispatchEffect,
  date,
  project,
  templates,
}) => {
  const classes = useStyles();
  const [editStateEntries, setEditStateEntries] = useState<number[]>([]);
  const activityOptions = (project.time_entry_activities || []).map((el) => ({
    value: el.id,
    label: el.name,
  }));

  const [newEntry, setNewEntry] = useState<EntryType[]>([]);

  const handleAddNewEntry = (t?: Template) => {
    const template = t || templates.find((el) => el.isDefault);
    setNewEntry([
      {
        id: new Date().getTime(),
        activity:
          activityOptions.find((el) => el.value === template?.activityId) || activityOptions[0],
        comments: template?.comments || "",
        hours: template?.hours || 0,
        issue: issues.find((el) => el.id === template?.issueId),
      },
      ...newEntry,
    ]);
  };

  const handleTimeEntryDelete = (timeEntryId: number) =>
    dispatchEffect(deleteTimeEntryEffect(timeEntryId));

  return (
    <Grid item xs={12}>
      {!timeEntries.length && !newEntry.length ? (
        <EmptyTimeEntryState onClick={() => handleAddNewEntry()} />
      ) : (
        <React.Fragment>
          <TableList
            header={
              <TableListHead>
                <TableListHeadCol xs={2}>Activity</TableListHeadCol>
                <TableListHeadCol xs={3}>Issue</TableListHeadCol>
                <TableListHeadCol xs={5}>Comment</TableListHeadCol>
                <TableListHeadCol xs={2}>Hours</TableListHeadCol>
              </TableListHead>
            }
            action={
              <Box>
                <IconButton className={classes.tableHeadAction} onClick={() => handleAddNewEntry()}>
                  <AddBoxIcon color="primary" />
                </IconButton>
                <TemplateSelect templates={templates} onSelect={handleAddNewEntry} />
              </Box>
            }
          >
            {newEntry.map((entry) => (
              <FormAddEntryRow
                dispatchEffect={dispatchEffect}
                date={date}
                projectId={project.id}
                issues={issues}
                key={entry.id}
                activityOptions={activityOptions}
                entry={entry}
                onDelete={() => {
                  const updated = newEntry.filter((el) => el.id !== entry.id);
                  setNewEntry(updated);
                }}
                onAddSuccess={() => {
                  const updated = newEntry.filter((el) => el.id !== entry.id);
                  setNewEntry(updated);
                }}
              />
            ))}
            {timeEntries.map((timeEntry) => {
              return (
                <React.Fragment key={timeEntry.id}>
                  {editStateEntries.includes(timeEntry.id) ? (
                    <FormEditEntryRow
                      entry={timeEntry}
                      activityOptions={activityOptions}
                      issues={issues}
                      dispatchEffect={dispatchEffect}
                      onSaved={() => {
                        const updated = editStateEntries.filter((el) => el !== timeEntry.id);
                        setEditStateEntries(updated);
                      }}
                      onCancel={() => {
                        const updated = editStateEntries.filter((el) => el !== timeEntry.id);
                        setEditStateEntries(updated);
                      }}
                    />
                  ) : (
                    <EntryRowView
                      entry={timeEntry}
                      onDelete={() => handleTimeEntryDelete(timeEntry.id)}
                      onEdit={() => {
                        setEditStateEntries([...editStateEntries, timeEntry.id]);
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </TableList>
        </React.Fragment>
      )}
    </Grid>
  );
};
