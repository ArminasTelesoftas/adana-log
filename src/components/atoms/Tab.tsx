import {
  createStyles,
  makeStyles,
  Tab as MaterialTab,
  Theme,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      minWidth: 134,
      [theme.breakpoints.only("xs")]: {
        minWidth: 118,
      },
    },
  })
);

interface TabProps {
  label: string;
  value: string;
  to?: string;
  onChange?: () => void;
  onClick?: () => void;
  selected?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  value,
  label,
  to,
  onChange,
  onClick,
  selected,
}) => {
  const classes = useStyles();

  const defaultProps = {
    value,
    onChange,
    onClick,
    className: classes.tab,
    key: value,
    selected,
    label: <Typography variant="subtitle2">{label}</Typography>,
  };

  return to ? (
    <MaterialTab
      {...defaultProps}
      component={NavLink}
      to={to}
      color="inherit"
    />
  ) : (
    <MaterialTab {...defaultProps} color="inherit" />
  );
};
