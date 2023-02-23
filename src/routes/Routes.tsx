import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "../container/Layout";
import { PrivateRoute } from "./PrivateRoute/";
//pages
import { AuthPage } from "../pages/AuthPage/";
import { ActivateOperatorPage } from "../pages/Users/Operators/ActivateOperatorPage";
import { Page500 } from "../pages/500";
import { Page404 } from "../pages/404/";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <PrivateRoute path="/admin" component={Layout} />
      <Route exact path="/activate-operator" component={ActivateOperatorPage} />
      <Route exact path="/500" component={Page500} />
      <Route component={Page404} />
    </Switch>
  );
};
