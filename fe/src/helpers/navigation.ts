import { LocationState, History } from "history";
import { RouteNames } from "../routes/routes";

export const goToLogin = (history: History<LocationState>) => {
  history.push(RouteNames.Login);
};

export const goToHomePage = (history: History<LocationState>) => {
  history.replace(RouteNames.Home);
};
