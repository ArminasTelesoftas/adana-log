import React from "react";
import { createStyles, makeStyles, Tabs, Theme } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import {Tab} from "../atoms/Tab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indicator: {
      backgroundColor: theme.palette.primary.contrastText,
    },
  })
);

interface TabMenuProps {
  tabs: Array<{
    label: string;
    link: string;
  }>;
  onChange?: () => void;
}

export const TabMenu: React.FC<TabMenuProps> = ({ tabs, onChange }) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const match = tabs.find(({ link }) => link === pathname);

  return tabs.length > 0 ? (
    <Tabs
      value={match?.link || tabs[0].link}
      classes={{ indicator: classes.indicator }}
    >
      {tabs.map(({ label, link }) => (
        <Tab
          label={label}
          value={link}
          to={link}
          key={link}
          onClick={onChange}
        />
      ))}
    </Tabs>
  ) : (
    <React.Fragment />
  );
};
