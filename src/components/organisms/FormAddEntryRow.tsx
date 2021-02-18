import React from "react";
import { useForm } from "react-hook-form";
import { Box, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { TableListRow } from "../atoms/TableListRow";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Issue } from "../../types/models";
import { AppDispatchEffect } from "../../App.reducer";
import { postTimeEntryEffect } from "../pages/Project/effects";
import { TimeEntryFormFields } from "../molecules/TimeEntryFormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { timeEntrySchema } from "../../utils/yupSchemas";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitIcon: {
      color: theme.palette.success.main,
    },
  })
);

interface FormAddEntryRowProps {
  entry: {
    activity: { value: number; label: string };
    comments: string;
    hours: number;
    issue?: Issue;
  };
  date: string;
  projectId: number;
  activityOptions: Array<{ value: number; label: string }>;
  onDelete: () => void;
  issues: Issue[];
  dispatchEffect: AppDispatchEffect;
  onAddSuccess: () => void;
}

export interface FormAddEntryRowValues {
  activity: number;
  comments: string;
  hours: number;
  issue: Issue | null;
}

export const FormAddEntryRow: React.FC<FormAddEntryRowProps> = ({
  entry,
  activityOptions,
  onDelete,
  issues,
  dispatchEffect,
  date,
  projectId,
  onAddSuccess,
}) => {
  const classes = useStyles();
  const { register, control, handleSubmit, errors } = useForm<FormAddEntryRowValues>({
    resolver: yupResolver(timeEntrySchema),
    defaultValues: { ...entry, activity: entry.activity.value, issue: entry.issue || null },
  });

  const onSubmit = (data: FormAddEntryRowValues) => {
    dispatchEffect(
      postTimeEntryEffect({
        date,
        activityId: data.activity,
        projectId: projectId,
        hours: Number(data.hours),
        ...(data.comments && { comments: data.comments }),
        ...(data.issue && { issueId: data.issue.id }),
      })
    )
      .then(onAddSuccess)
      .catch((e) => {
        console.error("error adding new time entry:", e);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TableListRow
        secondaryAction={
          <Box>
            <IconButton type="submit">
              <SaveIcon className={classes.submitIcon} />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        }
      >
        <TimeEntryFormFields
          control={control}
          errors={errors}
          register={register}
          issues={issues}
          activityOptions={activityOptions}
        />
      </TableListRow>
    </form>
  );
};
