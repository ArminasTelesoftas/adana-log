import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../App.reducer";
import { logoutAction } from "../Login/actions";
import { Box, Divider, Drawer as MuiDrawer, List } from "@material-ui/core";
import { User } from "../../../types/models";
import { ProfileInfo } from "../../molecules/ProfileInfo";
import { toggleDrawerAction } from "./actions";
import { DrawerListItem } from "../../atoms/DrawerListItem";
import { routes } from "../../../routes";
import { useLocation } from "react-router-dom";
import { api } from "../../../index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ width }: { width: number }) => ({
      width: width,
    }),
    tabs: {
      overflow: "unset",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    tabsFlexContainer: {
      height: "100%",
    },
    tab: {
      minWidth: "unset",
      width: "100%",
    },
    tabTopPush: {
      marginTop: "auto",
    },
    tabBottom: {
      marginBottom: theme.spacing(3),
    },
    indicator: {
      display: "none",
    },
    list: {
      padding: theme.spacing(1),
    },
  })
);

interface NavTabsProps {
  user: User;
}

export const Drawer: React.FC<NavTabsProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { open, width } = useAppSelector((state) => state.drawer);
  const classes = useStyles({ width });
  const { pathname } = useLocation();

  const handleLogout = async () => {
    dispatch(logoutAction());
    dispatch(toggleDrawerAction(false));
    await api.logout();
  };
  const handleClose = () => dispatch(toggleDrawerAction(false));

  return (
    <MuiDrawer
      variant="persistent"
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.root }}
    >
      <Box>
        <ProfileInfo user={user} />
        <Divider />
        <List className={classes.list}>
          <DrawerListItem selected={pathname === routes.projects.path} to={routes.projects.path}>
            {routes.projects.name}
          </DrawerListItem>
          <DrawerListItem selected={pathname === routes.reminders.path} to={routes.reminders.path}>
            {routes.reminders.name}
          </DrawerListItem>
          <DrawerListItem selected={pathname === routes.updates.path} to={routes.updates.path}>
            {routes.updates.name}
          </DrawerListItem>
          <DrawerListItem
            selected={pathname === routes.login.path}
            to={routes.login.path}
            onClick={handleLogout}
          >
            Logout
          </DrawerListItem>
        </List>
      </Box>
    </MuiDrawer>
  );

  // return (
  //   <Tabs
  //     orientation="vertical"
  //     value={activeTab}
  //     onChange={handleChange}
  //     className={classes.tabs}
  //     classes={{
  //       flexContainer: classes.tabsFlexContainer,
  //       indicator: classes.indicator,
  //     }}
  //   >
  //     <ProfileInfo user={user} />
  //     <Divider />
  //     <Tab
  //       label="Projects"
  //       to={routes.projects.path}
  //       {...a11yProps(0)}
  //     />
  //     <Tab
  //       icon={<PersonIcon />}
  //       to={routes.profile.path}
  //       {...a11yProps(1, clsx(classes.tabTopPush))}
  //     />
  //     <Tab
  //       onClick={handleLogout}
  //       icon={<ExitToAppIcon />}
  //       {...a11yProps(2, clsx(classes.tabBottom))}
  //     />
  //   </Tabs>
  // );
};
