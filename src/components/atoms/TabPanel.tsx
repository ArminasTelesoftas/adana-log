import { Box, makeStyles, createStyles } from "@material-ui/core";
import React from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const useStyles = makeStyles(() =>
  createStyles({
    tabPanel: {
      flexDirection: "column",
      flexGrow: 1,
      overflow: "auto",
    },
  })
);

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
}) => {
  const classes = useStyles();
  const isActive = value === index;
  return (
    <Box className={classes.tabPanel} display={isActive ? "flex" : "none"}>
      {children}
    </Box>
  );
};
