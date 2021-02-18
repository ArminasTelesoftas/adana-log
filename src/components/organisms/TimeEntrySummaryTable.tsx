import React  from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Grid } from "@material-ui/core";
import { TimeEntry } from "../../types/models";

interface TimeEntrySummaryTableProps {
  timeEntries: TimeEntry[];
}

export const TimeEntrySummaryTable: React.FC<TimeEntrySummaryTableProps> = ({ timeEntries }) => {
  const sum = timeEntries.reduce((acc, entry) => acc + (entry.hours || 0), 0)
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Activity</TableCell>
              <TableCell align="left">Issue</TableCell>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="left">Hours ({sum})</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeEntries.map((timeEntry) => {
              const { id, spent_on, user, activity, issue, comments, hours } = timeEntry;
              return (
                <TableRow key={id} hover>
                  <TableCell component="th" scope="row">
                    {spent_on}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{activity?.name}</TableCell>
                  <TableCell align="left">{issue?.id}</TableCell>
                  <TableCell align="left">{comments}</TableCell>
                  <TableCell align="left">{hours}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
