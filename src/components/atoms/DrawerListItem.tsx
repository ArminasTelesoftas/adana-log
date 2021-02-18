import { Link } from "react-router-dom";
import {
  createStyles,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navItem: {
      padding: theme.spacing(2, 0),
      borderRadius: 4,
    },
    link: {
      display: "inline-flex",
      paddingLeft: theme.spacing(2),
    },
  })
);

interface LinkListProps {
  selected: boolean;
  to: string;
  onClick?: () => void;
}
export const DrawerListItem: React.FC<LinkListProps> = ({
  children,
  selected,
  to,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      onClick={onClick}
      className={classes.navItem}
      selected={selected}
      button
      color="inherit"
      component={Link}
      to={to}
    >
      <Typography
        className={classes.link}
        variant="subtitle2"
        color={selected ? "primary" : "textSecondary"}
      >
        {children}
      </Typography>
    </ListItem>
  );
};
