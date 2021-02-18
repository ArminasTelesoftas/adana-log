import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContainer } from "../atoms/AppContainer";
import { match } from "react-router-dom";
import { AppDispatch } from "../../App.reducer";
import { toggleDrawerAction } from "../pages/Drawer/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      position: "sticky",
      top: 0,
    },
  })
);

interface TopBarProps {
  match: match;
  dispatch: AppDispatch;
  title: string;
  appBarContent?: React.ReactElement;
}

export const TopBar: React.FC<TopBarProps> = ({
  children,
  match,
  dispatch,
  title,
  appBarContent,
}) => {
  const classes = useStyles();

  const handleToggleDrawer = () => dispatch(toggleDrawerAction());

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
        {appBarContent}
      </AppBar>
      {children && <AppContainer>{children}</AppContainer>}
    </React.Fragment>
  );
};
