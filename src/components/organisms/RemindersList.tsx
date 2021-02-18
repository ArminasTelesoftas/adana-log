import React from "react";
import { Reminder } from "../../types/models";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Checkbox, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TableContainer from "@material-ui/core/TableContainer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(5),
    },
  })
);

interface RemindersListProps {
  reminders: Reminder[];
  onChange: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

export const RemindersList: React.FC<RemindersListProps> = ({ reminders, onChange, onDelete }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Reminder Time</TableCell>
            <TableCell>Active</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {reminders.map((reminder, i) => {
            const { id, name, time, active } = reminder;
            return (
              <TableRow key={id}>
                <TableCell scope="row">{name}</TableCell>
                <TableCell width={200}>{format(new Date(time), "HH:mm")}</TableCell>
                <TableCell width={100}>
                  <Checkbox
                    color="primary"
                    checked={Boolean(active)}
                    onChange={(event) => {
                      onChange({ ...reminder, active: event.target.checked });
                    }}
                  />
                </TableCell>
                <TableCell width={100}>
                  <IconButton onClick={() => onDelete(id)}>
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
