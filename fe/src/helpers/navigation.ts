import { LocationState, History } from "history";
import { CellData } from "../components/SudokuBox";
import { NewSudokuLocationProps } from "../containers/NewSudokuContainer";
import { RouteNames } from "../routes/routes";

export const goToLogin = (history: History<LocationState>, state?: boolean) => {
  history.push({ pathname: RouteNames.Login, state });
};

export const goToHomePage = (history: History<LocationState>) => {
  history.replace(RouteNames.Home);
};

export const goToNewSudoku = (
  history: History<LocationState>,
  state?: NewSudokuLocationProps
) => {
  history.replace({
    pathname: RouteNames.New,
    state: { board: state?.board, type: state?.type },
  });
};
