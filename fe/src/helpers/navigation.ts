import { LocationState, History } from "history";
import { NewSudokuLocationProps } from "../containers/NewSudokuContainer";
import { RouteNames } from "../routes/routes";

export const goToLogin = (history: History<LocationState>, state?: boolean) => {
  history.push({ pathname: RouteNames.Login, state });
};

export const goToRegister = (history: History<LocationState>) => {
  history.push(RouteNames.Register);
};

export const goToStart = (history: History<LocationState>) => {
  history.push(RouteNames.Start);
};

export const goToHomePage = (history: History<LocationState>) => {
  history.push(RouteNames.Home);
};

export const goToMySudoku = (history: History<LocationState>) => {
  history.push(RouteNames.MySudoku);
};

export const goToNewSudoku = (
  history: History<LocationState>,
  state?: NewSudokuLocationProps
) => {
  history.push({
    pathname: RouteNames.New,
    state: { board: state?.board, type: state?.type },
  });
};
