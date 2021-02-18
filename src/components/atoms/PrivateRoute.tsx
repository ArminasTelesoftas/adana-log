import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { routes } from "../../routes";

interface PrivateRouteProps {
  auth: boolean;
  component: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  auth,
  component: Component,
  ...props
}: // tslint:disable-next-line:no-any
any) => {
  return (
    <Route
      {...props}
      render={(routeProps): React.ReactNode =>
        auth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: routes.login.path,
              state: {
                from:
                  (routeProps.location.pathname || "") +
                  routeProps.location.search,
              },
            }}
          />
        )
      }
    />
  );
};
