import {Box, List, ListItem} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
      flex: "1 1 auto",
      overflow: "auto",
    },
    listContainer: {
      marginTop: 30,
      padding: 0,
    },
    gridList: {
      paddingLeft: theme.spacing(2),
      paddingBottom: 0,
    },
    headerActionPlaceholder: {
      position: "relative",
      marginTop: theme.spacing(3),
      minHeight: 38,
      width: 140,
      paddingBottom: 18,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    list: {
      overflowY: "auto",
      paddingBottom: theme.spacing(6),
    },
  })
);

interface TableListProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  action?: React.ReactNode;
}

export const TableList: React.FC<TableListProps> = ({
  header,
  action,
  children,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {header && (
        <ListItem className={classes.gridList} disableGutters>
          {header}
          <Box className={classes.headerActionPlaceholder}>{action}</Box>
        </ListItem>
      )}
      <List className={classes.list}>{children}</List>
    </React.Fragment>
  );
};
