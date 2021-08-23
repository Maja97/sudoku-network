import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { CellData } from "../components/SudokuBox";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { onValueEnter } from "../helpers/functions";
import { goToHomePage } from "../helpers/navigation";
import SolveScreen from "../screens/SolveScreen";
import service from "../service/service";

const SolveContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const formMethods = useForm();
  const [sudoku, setSudoku] = React.useState<CellData[][]>([]);
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);

  React.useEffect(() => {
    if (!isNaN(+id)) {
      service
        .getSudokuById(parseInt(id))
        .then((res) => {
          const data = res.board.map((row) =>
            row.map((item) => ({
              value: item,
              disabled: Boolean(item),
              error: false,
            }))
          );
          const specificType = Object.values(sudokuType).find(
            (item) => item.identifier === res.type
          );
          if (specificType) setType(specificType);
          setSudoku(data);
        })
        .catch((e) => goToHomePage(history));
    }
  }, [id, history]);

  const checkConstraints = React.useCallback(
    (value: string, row: number, column: number) => {
      const copy = sudoku.map((a) => a.map((item: any) => ({ ...item })));
      const board = onValueEnter(copy, row, column, value, type);
      setSudoku(board);
    },
    [sudoku, type]
  );

  return (
    <FormProvider {...formMethods}>
      <SolveScreen
        type={type}
        sudoku={sudoku}
        checkConstraints={checkConstraints}
      />
    </FormProvider>
  );
};

export default SolveContainer;
