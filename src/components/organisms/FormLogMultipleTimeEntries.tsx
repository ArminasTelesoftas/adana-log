import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { Issue, Project } from "../../types/models";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "../atoms/FormSelect";
import { FormDatePickerField } from "./FormDatePickerField";
import { monthAgo, today } from "../../utils";
import { eachDayOfInterval, format, getISODay } from "date-fns";
import { AppDispatchEffect } from "../../App.reducer";
import { postMultiTimeEntryEffect } from "../pages/Project/effects";
import { FormIssueSelect } from "../atoms/FormIssueSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { yupHoursSchema } from "../../utils/yupSchemas";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1,
    },
    dialog: {
      width: "100%",
    },
  })
);

interface FormValues {
  fromDate: Date;
  toDate: Date;
  hours: number;
  comments: string;
  activity: number;
  excludeWeekDays: number[];
  issue: Issue | null;
}

interface LogMultipleTimeEntriesProps {
  project: Project;
  dispatchEffect: AppDispatchEffect;
  issues: Issue[];
}

export const FormLogMultipleTimeEntries: React.FC<LogMultipleTimeEntriesProps> = ({
  project,
  dispatchEffect,
  issues,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityOptions = (project.time_entry_activities || []).map((el) => ({
    value: el.id,
    label: el.name,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, control, errors, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        hours: yupHoursSchema,
      })
    ),
    defaultValues: {
      fromDate: monthAgo(),
      toDate: today(),
      hours: 8,
      comments: "",
      activity: activityOptions[0].value,
      issue: null,
      excludeWeekDays: [6, 7],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const interval = eachDayOfInterval({
      start: data.fromDate,
      end: data.toDate,
    });
    const formattedDates = interval
      .filter((el) => !data.excludeWeekDays.includes(getISODay(el)))
      .map((el) => format(el, "yyyy-MM-dd"));

    try {
      await dispatchEffect(
        postMultiTimeEntryEffect({
          dates: formattedDates,
          issueId: data.issue?.id,
          hours: data.hours,
          activityId: data.activity,
          comments: data.comments,
          projectId: project.id,
        })
      );
      handleClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Fab color="primary" variant="extended" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
        Log Time
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" classes={{ paper: classes.dialog }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Log Multiple Days</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormDatePickerField
                  name="fromDate"
                  label="From Date"
                  variant="filled"
                  control={control}
                />
              </Grid>
              <Grid item xs={6}>
                <FormDatePickerField
                  name="toDate"
                  label="To Date"
                  variant="filled"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Exclude week days:</Typography>
                <Controller
                  name="excludeWeekDays"
                  control={control}
                  render={({ onChange, value }) => (
                    <>
                      {[1, 2, 3, 4, 5, 6, 7].map((weekDay) => (
                        <FormControlLabel
                          key={weekDay}
                          control={
                            <Checkbox
                              checked={value.includes(weekDay)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  onChange([...value, weekDay]);
                                } else {
                                  onChange(value.filter((el: number) => el !== weekDay));
                                }
                              }}
                              color="primary"
                            />
                          }
                          label={weekDay}
                        />
                      ))}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  inputRef={register}
                  name="hours"
                  type="number"
                  label="Hours"
                  helperText={errors.hours?.message}
                  error={Boolean(errors.hours)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  control={control}
                  options={activityOptions}
                  name="activity"
                  label="Activity"
                />
              </Grid>
              <Grid item xs={12}>
                <FormIssueSelect control={control} issues={issues} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comments"
                  variant="filled"
                  inputRef={register}
                  name="comments"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
