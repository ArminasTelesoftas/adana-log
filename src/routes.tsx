import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Projects } from "./components/pages/Projects/component";
import { Login } from "./components/pages/Login/component";
import { Project } from "./components/pages/Project/component";
import { useAppSelector } from "./App.reducer";
import { PrivateRoute } from "./components/atoms/PrivateRoute";
import { ProjectCalendar } from "./components/pages/ProjectCalendar";
import { ProjectSummary } from "./components/pages/ProjectSummary";
import { Templates } from "./components/pages/Templates/component";
import { Reminders } from "./components/pages/Reminders/component";
import { Updates } from "./components/pages/Updates/component";

export const routes = {
  login: { path: "/login", name: "Login" },
  projects: { path: "/projects", name: "Projects" },
  reminders: { path: "/reminders", name: "Reminders" },
  project: {
    path: "/projects/:projectId/",
    name: "Project",
  },
  projectCalendar: {
    path: "/projects/:projectId/calendar",
    name: "Calendar",
  },
  projectSummary: {
    path: "/projects/:projectId/summary",
    name: "Summary",
  },
  projectTemplates: {
    path: "/projects/:projectId/templates",
    name: "Templates",
  },
  updates: { path: "/updates", name: "Updates" },
};

export const Routes = () => {
  const state = useAppSelector((state) => state);

  const auth = Boolean(state.login.user);
  return (
    <React.Fragment>
      <Route path="/" render={() => <Redirect to={routes.projects.path} />} />
      <Route exact path={routes.login.path} component={Login} />
      <PrivateRoute
        // exact
        auth={auth}
        path={routes.project.path}
        component={Project}
      />
      <PrivateRoute exact auth={auth} path={routes.reminders.path} component={Reminders} />
      <Switch>
        <PrivateRoute
          exact
          auth={auth}
          path={routes.projectCalendar.path}
          component={ProjectCalendar}
        />
        <PrivateRoute
          exact
          auth={auth}
          path={routes.projectSummary.path}
          component={ProjectSummary}
        />
        <PrivateRoute exact auth={auth} path={routes.projectTemplates.path} component={Templates} />
      </Switch>
      <PrivateRoute exact auth={auth} path={routes.projects.path} component={Projects} />
      <PrivateRoute exact auth={auth} path={routes.updates.path} component={Updates} />
    </React.Fragment>
  );
};
