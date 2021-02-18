import React from "react";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
    },
  })
);

interface AppContainerProps {
  children: any;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <Container className={classes.root}>{children}</Container>;
};
