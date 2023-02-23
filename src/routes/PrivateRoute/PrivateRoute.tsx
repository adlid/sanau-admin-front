import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { useTypedSelector } from "../../utils/hooks/reduxHooks";

export const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) => <Component {...props} /> }
    />
  );
};
