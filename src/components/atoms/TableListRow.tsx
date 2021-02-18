import { Grid, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { MouseEventHandler } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRow: {
      minHeight: 85,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(15),
    },
    row: {
      alignItems: "baseline",
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

interface TableListRowProps {
  component?: React.ReactNode;
  className?: string;
  secondaryAction?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  to?: string;
  href?: string;
  alignItems?: "stretch" | "center" | "flex-end" | "flex-start" | "baseline";
}

export const TableListRow: React.FC<TableListRowProps> = ({
  children,
  className,
  secondaryAction,
  to,
  href,
  alignItems = "flex-start",
  ...props
}) => {
  const classes = useStyles();

  return (
    <ListItem disableGutters className={clsx(classes.listRow, className)} {...props}>
      <Grid container wrap="nowrap" alignItems={alignItems} className={classes.row}>
        {children}
      </Grid>
      <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
    </ListItem>
  );
};
