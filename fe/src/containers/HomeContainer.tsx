import React from "react";
import HomeScreen from "../screens/HomeScreen";
import service, { SudokuFilters } from "../service/service";
import { Sudoku } from "../types/Sudoku";
import { goToNewSudoku, goToSingleSudoku } from "../helpers/navigation";
import { useHistory } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const SudokuFiltersFields = {
  type: "type",
  publishDate: "publishDate",
  rating: "rating",
};

const initialFilters = {
  type: null,
  publishDate: null,
  rating: null,
};

const HomeContainer = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.auth.user);
  const [filters, setFilters] = React.useState<SudokuFilters>(initialFilters);
  const [sudoku, setSudoku] = React.useState<Sudoku[]>([]);
  const formMethods = useForm();

  React.useEffect(() => {
    service
      .getAllSudoku({
        type: filters["type"],
        publishDate: filters["publishDate"],
        rating: filters["rating"],
      })
      .then((res) => {
        if (user) {
          service
            .getAllSolvedByUser(user.username)
            .then((all) => {
              const ids = all.map((item: any) => item.board_id);
              const newSudoku = res.map((item) =>
                item.boardId && ids.includes(item.boardId)
                  ? {
                      ...item,
                      solved: true,
                    }
                  : item
              );
              setSudoku(newSudoku);
            })
            .catch((e) => console.log(e));
        } else setSudoku(res);
      })
      .catch((e) => console.log(e));
  }, [filters, user]);

  const navigateToNewSudoku = React.useCallback(
    () => goToNewSudoku(history),
    [history]
  );

  const navigateToSingleSudoku = React.useCallback(
    (id: number | undefined) => {
      if (id) goToSingleSudoku(history, id);
    },
    [history]
  );

  const onFiltersChange = React.useCallback(
    (key: string, value: string | number | null) => {
      setFilters((state) => ({ ...state, [key]: value }));
    },
    []
  );

  return (
    <FormProvider {...formMethods}>
      <HomeScreen
        sudoku={sudoku}
        onFiltersChange={onFiltersChange}
        onGoToNewSudoku={navigateToNewSudoku}
        onGoSolveSudoku={navigateToSingleSudoku}
      />
    </FormProvider>
  );
};

export default HomeContainer;
