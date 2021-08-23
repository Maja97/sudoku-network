enum Routes {
  Login = "/login",
  Start = "/start",
  Home = "/dashboard",
  Register = "/register",
  NewSudoku = "/new",
  MySudoku = "/my-sudoku",
  Solve = "/sudoku/:id",
}

export const RouteNames = {
  Login: Routes.Login,
  Start: Routes.Start,
  Home: Routes.Home,
  Register: Routes.Register,
  New: Routes.NewSudoku,
  MySudoku: Routes.MySudoku,
  Solve: Routes.Solve,
};
