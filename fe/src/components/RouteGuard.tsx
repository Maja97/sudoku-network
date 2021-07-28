import React from "react";
import { ACCESS_TOKEN } from "../constants/auth";
import { Redirect, Route } from "react-router-dom";
import { RouteNames } from "../routes/routes";

interface Props {
  exact: boolean;
  strict: boolean;
  path: string;
  children: JSX.Element;
}

const RouteGuard = ({ exact, path, children, strict }: Props) => {
  return localStorage.getItem(ACCESS_TOKEN) ? (
    <Route exact={exact} path={path} strict={strict}>
      {children}
    </Route>
  ) : (
    <Redirect to={RouteNames.Start} />
  );
};

export default RouteGuard;
