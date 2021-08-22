import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HomeScreen from "../screens/HomeScreen";
import service from "../service/service";
import { Sudoku } from "../types/Sudoku";
import { goToNewSudoku } from "../helpers/navigation";
import { useHistory } from "react-router-dom";

const HomeContainer = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.auth.user);
  const [sudoku, setSudoku] = React.useState<Sudoku[]>([]);

  React.useEffect(() => {
    service
      .getAllSudoku()
      .then((res) => setSudoku(res))
      .catch((e) => console.log(e));
  }, []);

  const navigateToNewSudoku = React.useCallback(
    () => goToNewSudoku(history),
    [history]
  );

  return <HomeScreen sudoku={sudoku} onGoToNewSudoku={navigateToNewSudoku} />;
};

export default HomeContainer;
