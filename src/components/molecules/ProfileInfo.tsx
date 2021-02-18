import React from "react";
import {Avatar, Box, Typography} from "@material-ui/core";
import { User } from "../../types/models";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userCard: {
      marginTop: theme.spacing(4),
    },
    root: {
      padding: theme.spacing(3, 3, 1, 2),
    },
    avatar: {
      marginBottom: theme.spacing(2),
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    fullName: {
      paddingLeft: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
    mail: {
      paddingLeft: theme.spacing(0.5),
    },
    customLogoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 104,
      width: "100%",
      marginBottom: theme.spacing(3),
    },
    customLogo: {
      maxWidth: "80%",
      maxHeight: "100%",
    },
  })
);

interface ProfileInfoProps {
  user: User;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar className={classes.avatar}>
        {user.firstname.slice(0, 1)}
        {user.lastname.slice(0, 1)}
      </Avatar>

      <Typography className={classes.fullName} variant="h4">
        {user.firstname} {user.lastname}
      </Typography>
      <Typography
        className={classes.mail}
        variant="body2"
        color="textSecondary"
      >
        {user.mail}
      </Typography>
    </Box>
  );
};
