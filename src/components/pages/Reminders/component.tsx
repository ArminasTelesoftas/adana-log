import React, { useEffect } from "react";
import { useAppDispatch, useAppDispatchEffect, useAppSelector } from "../../../App.reducer";
import { Box, Paper } from "@material-ui/core";
import { match } from "react-router-dom";
import { TopBar } from "../../organisms/TopBar";
import { deleteReminderEffect, getRemindersEffect, patchReminderEffect } from "./effects";
import { RemindersList } from "../../organisms/RemindersList";
import { FormCreateReminder } from "../../organisms/FormCreateReminder";
import { Reminder } from "../../../types/models";

interface RemindersProps {
  match: match;
}

export const Reminders: React.FC<RemindersProps> = ({ match }) => {
  const dispatchEffect = useAppDispatchEffect();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const handleReminderChange = async (reminder: Reminder) => {
    dispatchEffect(patchReminderEffect(reminder));
  };

  const handleReminderDelete = async (id: string) => {
    dispatchEffect(deleteReminderEffect(id));
  };

  useEffect(() => {
    dispatchEffect(getRemindersEffect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBar match={match} dispatch={dispatch} title="Reminders">
        <Box pt={3}>
          <Paper elevation={4}>
            <RemindersList
              reminders={state.reminders.reminders}
              onChange={handleReminderChange}
              onDelete={handleReminderDelete}
            />
          </Paper>
        </Box>
      </TopBar>

      <FormCreateReminder dispatchEffect={dispatchEffect} />
    </>
  );
};
