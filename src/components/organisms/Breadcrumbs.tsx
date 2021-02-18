import {Breadcrumbs as MuiBreadcrumbs, createStyles, Link, makeStyles, Theme, Typography,} from "@material-ui/core";
import {fade} from "@material-ui/core/styles/colorManipulator";
import React from "react";
import {Link as RouterLink, match} from "react-router-dom";
import {routes} from "../../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbsContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20,
    },
    breadcrumbActive: {
      color: fade(theme.palette.text.primary, 0.5),
    },
    breadcrumbLink: {
      color: fade(theme.palette.text.secondary, 0.25),
    },
  })
);

interface BreadcrumbsProps {
  match: match;
}

const generateBreadcrumbs = (match: match<any>) => {
  const breadcrumbRoutes = Object.values(routes).map((route) => route);
  return breadcrumbRoutes
    .filter(({ path }) => match.path.includes(path))
    .map(({ path, ...rest }) => ({
      path: Object.keys(match.params).length
        ? Object.keys(match.params).reduce(
            (path, param) => path.replace(`:${param}`, match.params[param]),
            path
          )
        : path,
      ...rest,
    }));
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ match }) => {
  const classes = useStyles();
  const breadcrumbs = generateBreadcrumbs(match);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(
        (
          breadcrumb: {
            path: string;
            name: string;
          },
          index: number
        ) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <Typography
                key={breadcrumb.name}
                className={classes.breadcrumbActive}
              >
                {breadcrumb.name}
              </Typography>
            );
          }
          return (
            <Link
              data-testid="breadcrumb-link"
              to={breadcrumb.path}
              key={breadcrumb.name}
              component={RouterLink}
              className={classes.breadcrumbLink}
            >
              {breadcrumb.name}
            </Link>
          );
        }
      )}
    </MuiBreadcrumbs>
  );
};
