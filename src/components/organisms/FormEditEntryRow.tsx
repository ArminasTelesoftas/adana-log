import React from "react";
import { useForm } from "react-hook-form";
import { Box, IconButton } from "@material-ui/core";
import { TableListRow } from "../atoms/TableListRow";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Issue, TimeEntry } from "../../types/models";
import { AppDispatchEffect } from "../../App.reducer";
import CloseIcon from "@material-ui/icons/Close";
import { TimeEntryFormFields } from "../molecules/TimeEntryFormFields";
import { patchTimeEntryEffect } from "../pages/Project/effects";
import { yupResolver } from "@hookform/resolvers/yup";
import { timeEntrySchema } from "../../utils/yupSchemas";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitIcon: {
      color: theme.palette.success.main,
    },
  })
);

interface FormEditEntryRowProps {
  entry: TimeEntry;
  activityOptions: Array<{ value: number; label: string }>;
  onCancel: () => void;
  onSaved: () => void;
  issues: Issue[];
  dispatchEffect: AppDispatchEffect;
}

interface FormValues {
  activity: number;
  comments: string;
  hours: number;
  issue: Issue | null;
}

export const FormEditEntryRow: React.FC<FormEditEntryRowProps> = ({
  entry,
  activityOptions,
  issues,
  dispatchEffect,
  onCancel,
  onSaved,
}) => {
  const classes = useStyles();
  const { register, control, handleSubmit ,errors} = useForm<FormValues>({
    resolver: yupResolver(timeEntrySchema),
    defaultValues: {
      comments: entry.comments,
      hours: entry.hours,
      activity: entry.activity?.id,
      issue: issues.find((el) => el.id === entry.issue?.id) || null,
    },
  });
  const onSubmit = (data: FormValues) => {
    dispatchEffect(
      patchTimeEntryEffect(entry.id, {
        date: entry.spent_on,
        projectId: entry.project.id,
        activityId: data.activity,
        hours: Number(data.hours),
        comments: data.comments,
        issueId: data.issue?.id,
      })
    )
      .then(onSaved)
      .catch((e) => {
        console.error("error updating time entry:", e);
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
            <IconButton onClick={onCancel}>
              <CloseIcon />
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
