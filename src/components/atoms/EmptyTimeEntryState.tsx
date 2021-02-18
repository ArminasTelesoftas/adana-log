import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {},
});

interface EmptyTimeEntryStateProps {
  onClick?: () => void;
}

export const EmptyTimeEntryState: React.FC<EmptyTimeEntryStateProps> = ({
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Button variant="contained" color="primary" onClick={onClick}>
        Add entry
      </Button>
    </Box>
  );
};
