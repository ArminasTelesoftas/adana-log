import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Issue, Project, Template, TimeEntry } from "../../types/models";
import { Accordion, Box, Grid } from "@material-ui/core";
import { eachDayOfInterval, format, isWeekend } from "date-fns";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { TimeEntryDetails } from "../molecules/TimeEntryDetails";
import { AppDispatchEffect } from "../../App.reducer";
import { DateRange } from "../../types/types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  weekendRow: {
    backgroundColor: "#f8bbd0",
  },
  blurredRow: {
    opacity: 0.3,
  },
});

interface TimeEntriesCalendarListProps {
  timeEntries: TimeEntry[];
  issues: Issue[];
  dispatchEffect: AppDispatchEffect;
  project: Project;
  dateRange: DateRange;
  templates: Template[]
}

export const TimeEntriesCalendarList: React.FC<TimeEntriesCalendarListProps> = ({
  timeEntries,
  issues,
  dispatchEffect,
  project,
  dateRange,
  templates
}) => {
  const classes = useStyles();

  const [expand, setExpand] = useState<number[]>([]);
  const handleExpand = (index: number) => () => {
    if (expand.includes(index)) {
      setExpand(expand.filter((el) => el !== index));
    } else {
      setExpand([...expand, index]);
    }
  };

  const dateInterval = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  }).reverse();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {dateInterval.map((date, i) => {
          const yyyymmdd = format(date, "yyyy-MM-dd");
          const weekend = isWeekend(date);
          const entries = timeEntries.filter((el) => el.spent_on === yyyymmdd);
          const expanded = expand.includes(i);
          return (
            <Accordion
              key={yyyymmdd}
              expanded={expanded}
              onChange={handleExpand(i)}
              className={clsx({
                [classes.weekendRow]: weekend,
                [classes.blurredRow]: entries.length === 0 && !expanded,
              })}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2">{yyyymmdd}</Typography>
                <Box pl={2}>
                  <Typography variant="body2">{format(date, "EEEE")}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <TimeEntryDetails
                  templates={templates}
                  date={yyyymmdd}
                  project={project}
                  dispatchEffect={dispatchEffect}
                  issues={issues}
                  timeEntries={entries}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
    </Grid>
  );
};
