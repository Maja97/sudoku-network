import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { CellData } from "../components/SudokuBox";
import { CellRef } from "../components/SudokuGrid";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { msToMinutesAndSeconds, onValueEnter } from "../helpers/functions";
import { goToHomePage } from "../helpers/navigation";
import { columnFromIndex, rowFromIndex } from "../helpers/sudokuConstraints";
import SolveScreen from "../screens/SolveScreen";
import service from "../service/service";

const SolveContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const formMethods = useForm();
  const focusedRef = React.useRef<CellRef>();
  const [sudoku, setSudoku] = React.useState<CellData[][]>([]);
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);
  const [time, setTime] = React.useState<number>(0);
  const [start, setStart] = React.useState<boolean>(false);

  React.useEffect(() => setStart(true), []);

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

  React.useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    } else clearInterval(interval);
  }, [start]);

  const checkConstraints = React.useCallback(
    (value: string, row: number, column: number) => {
      const copy = sudoku.map((a) => a.map((item: any) => ({ ...item })));
      const board = onValueEnter(copy, row, column, value, type);
      setSudoku(board);
    },
    [sudoku, type]
  );

  const writeInFocused = React.useCallback(
    (number: string) => {
      const index = focusedRef.current?.getFocusedIndex();
      if (index && index !== -1) {
        const row = rowFromIndex(index, type.size);
        const column = columnFromIndex(index, type.size);
        const copy = sudoku.map((a) => a.map((item: any) => ({ ...item })));
        const board = onValueEnter(copy, row, column, number, type);
        setSudoku(board);
      }
    },
    [sudoku, type]
  );

  return (
    <FormProvider {...formMethods}>
      <SolveScreen
        type={type}
        focusedRef={focusedRef}
        sudoku={sudoku}
        time={msToMinutesAndSeconds(time)}
        enterNumber={writeInFocused}
        checkConstraints={checkConstraints}
      />
    </FormProvider>
  );
};

export default SolveContainer;
