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
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { AppDispatchEffect } from "../../App.reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { postReminderEffect } from "../pages/Reminders/effects";

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
  name: string;
  time: Date;
  active: boolean;
}

interface FormCreateReminderProps {
  dispatchEffect: AppDispatchEffect;
}

export const FormCreateReminder: React.FC<FormCreateReminderProps> = ({ dispatchEffect }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, control, errors, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Required"),
      })
    ),
    defaultValues: {
      name: "",
      time: new Date().setHours(17, 0, 0, 0),
    },
  });

  const onSubmit = async ({ active, name, time }: FormValues) => {
    setIsSubmitting(true);
    try {
      await dispatchEffect(
        postReminderEffect({
          name,
          active,
          time: new Date(time).toISOString(),
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
        Create Reminder
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" classes={{ paper: classes.dialog }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  inputRef={register}
                  name="name"
                  label="Reminder name"
                  helperText={errors.name?.message}
                  error={Boolean(errors.name)}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    control={control}
                    name="time"
                    render={({ onChange, value }) => {
                      return (
                        <TimePicker
                          fullWidth
                          format="HH:mm"
                          margin="normal"
                          label="Reminder time"
                          value={value}
                          onChange={(value: Date | null) => {
                            onChange(value);
                          }}
                          inputVariant="filled"
                          helperText={errors.time?.message}
                          error={Boolean(errors.time)}
                        />
                      );
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="active"
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
                        label="Set as active"
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
