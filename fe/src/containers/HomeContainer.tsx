import React from "react";
import HomeScreen from "../screens/HomeScreen";
import service, { SudokuFilters } from "../service/service";
import { Sudoku } from "../types/Sudoku";
import { goToNewSudoku, goToSingleSudoku } from "../helpers/navigation";
import { useHistory } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

export const SudokuFiltersFields = {
  type: "type",
  publishDate: "publishDate",
};

const initialFilters = {
  type: null,
  publishDate: null,
};

const HomeContainer = () => {
  const history = useHistory();
  const [filters, setFilters] = React.useState<SudokuFilters>(initialFilters);
  const [sudoku, setSudoku] = React.useState<Sudoku[]>([]);
  const formMethods = useForm();

  React.useEffect(() => {
    service
      .getAllSudoku({
        type: filters["type"],
        publishDate: filters["publishDate"],
      })
      .then((res) => setSudoku(res))
      .catch((e) => console.log(e));
  }, [filters]);

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
    (key: string, value: string | null) => {
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
