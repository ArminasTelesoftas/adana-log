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
  TextField
} from "@material-ui/core";
import { Issue, Project } from "../../types/models";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "../atoms/FormSelect";
import { AppDispatchEffect } from "../../App.reducer";
import { FormIssueSelect } from "../atoms/FormIssueSelect";
import { createTemplateEffect, getTemplatesEffect } from "../pages/Project/effects";
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
  title: string;
  hours: number;
  comments: string;
  activity: number;
  excludeWeekends: boolean;
  issue: Issue | null;
  isDefault: boolean;
}

interface FormCreateTemplateProps {
  project: Project;
  dispatchEffect: AppDispatchEffect;
  issues: Issue[];
}

export const FormCreateTemplate: React.FC<FormCreateTemplateProps> = ({
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
        title: yup.string().required("Required"),
        hours: yupHoursSchema,
      })
    ),
    defaultValues: {
      title: "",
      hours: 8,
      comments: "",
      activity: activityOptions[0].value,
      issue: null,
      isDefault: true,
    },
  });

  const onSubmit = async ({ isDefault, issue, activity, hours, comments, title }: FormValues) => {
    setIsSubmitting(true);
    try {
      await dispatchEffect(
        createTemplateEffect({
          projectId: project.id,
          isDefault,
          issueId: issue?.id,
          activityId: activity,
          hours,
          comments,
          title,
        })
      );

      // refetch all templates
      await dispatchEffect(getTemplatesEffect(project.id));
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
        Create Template
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" classes={{ paper: classes.dialog }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Create Template</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  inputRef={register}
                  name="title"
                  label="Template title"
                  helperText={errors.title?.message}
                  error={Boolean(errors.title)}
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
              <Grid item xs={12}>
                <Controller
                  name="isDefault"
                  control={control}
                  render={({ onChange, value }) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value}
                            onChange={(event) => onChange(event.target.checked)}
                            color="primary"
                          />
                        }
                        label="Set as default"
                      />
                    );
                  }}
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
