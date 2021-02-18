import {
  createStyles,
  Grid,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { GridProps } from "@material-ui/core/Grid";
import clsx from "clsx";
import React from "react";

export interface TableListColProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  tertiary?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ellipsis: {
      display: "block",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    overflow: {
      overflow: "hidden",
    },
  })
);

export const TableListCol: React.FC<GridProps & TableListColProps> = ({
  children,
  primary,
  secondary,
  tertiary,
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Grid
      item
      {...props}
      zeroMinWidth
      className={clsx(classes.overflow, className)}
    >
      {children}
      {(primary || secondary || tertiary) && (
        <ListItemText
          primary={primary}
          secondary={
            <React.Fragment>
              <span className={classes.ellipsis}>{secondary}</span>
              {Boolean(tertiary) && (
                <React.Fragment>
                  <span className={classes.ellipsis}>{tertiary}</span>
                </React.Fragment>
              )}
            </React.Fragment>
          }
        />
      )}
    </Grid>
  );
};
