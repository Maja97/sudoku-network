import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StartContainer from "../containers/StartContainer";
import LoginContainer from "../containers/LoginContainer";
import HomeContainer from "../containers/HomeContainer";
import RegisterContainer from "../containers/RegisterContainer";
import { RouteNames } from "./routes";
import NewSudokuContainer from "../containers/NewSudokuContainer";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route strict={true} exact={true} path={RouteNames.Start}>
          <StartContainer />
        </Route>
        <Route strict={true} exact={true} path={RouteNames.Login}>
          <LoginContainer />
        </Route>
        <Route exact={true} strict={true} path={RouteNames.Home}>
          <HomeContainer />
        </Route>
        <Route strict={true} exact={true} path={RouteNames.Register}>
          <RegisterContainer />
        </Route>
        <Route strict={true} exact={true} path={RouteNames.New}>
          <NewSudokuContainer />
        </Route>
        <Redirect to={RouteNames.Start} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
