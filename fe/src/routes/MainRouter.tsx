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
import UserSudokuContainer from "../containers/UserSudokuContainer";
import SolveContainer from "../containers/SolveContainer";
import RouteGuard from "../components/RouteGuard";
import UserAccountContainer from "../containers/UserAccountContainer";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route strict exact path={RouteNames.Start}>
          <StartContainer />
        </Route>
        <Route strict exact path={RouteNames.Login}>
          <LoginContainer />
        </Route>
        <Route exact strict path={RouteNames.Home}>
          <HomeContainer />
        </Route>
        <Route strict exact path={RouteNames.Register}>
          <RegisterContainer />
        </Route>
        <Route strict exact path={RouteNames.New}>
          <NewSudokuContainer />
        </Route>
        <RouteGuard strict exact path={RouteNames.MySudoku}>
          <UserSudokuContainer />
        </RouteGuard>
        <RouteGuard strict exact path={RouteNames.UserAccount}>
          <UserAccountContainer />
        </RouteGuard>
        <Route strict exact path={RouteNames.Solve}>
          <SolveContainer />
        </Route>
        <Redirect to={RouteNames.Start} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
