import React from "react";
import { Container as MuiContainer, ContainerProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    overflow: "auto",
  },
});

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <MuiContainer {...props} className={clsx(classes.root, className)}>
      {children}
    </MuiContainer>
  );
};
