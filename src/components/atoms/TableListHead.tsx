import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(3),
      paddingBottom: 0,
      "& .MuiGrid-item": {
        paddingBottom: 18,
      },
    },
    row: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& .MuiGrid-item": {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      "& .MuiGrid-item:first-child": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  })
);

interface TableListHeaderProps {}

export const TableListHead: React.FC<TableListHeaderProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      wrap="nowrap"
      className={`${classes.header} ${classes.row}`}
    >
      {children}
    </Grid>
  );
};
