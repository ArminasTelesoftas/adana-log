import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useAppSelector } from "./App.reducer";
import { useLocation } from "react-router-dom";
import { Routes, routes } from "./routes";
import { Drawer } from "./components/pages/Drawer/component";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { channels } from "../src/shared/constants";
import { Reminder } from "./types/models";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appShift: ({ drawerWidth }: { drawerWidth: number }) => ({
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export const App = () => {
  const { drawer, login } = useAppSelector((state) => state);
  const classes = useStyles({ drawerWidth: drawer.width });
  const { pathname } = useLocation();
  const { push } = useHistory();
  const loggedIn = Boolean(pathname !== routes.login.path && login.user);
  const drawerOpen = Boolean(loggedIn) && drawer.open;

  useEffect(() => {
    if (loggedIn) {
      window.api.send(channels.initRemindersListener);
      window.api.on(channels.invokeReminder, (reminder: Reminder) => {
        push(routes.projects.path);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <Box className={clsx(classes.app, { [classes.appShift]: drawerOpen })}>
      {pathname !== routes.login.path && login.user && <Drawer user={login.user} />}
      <Routes />
    </Box>
  );
};
