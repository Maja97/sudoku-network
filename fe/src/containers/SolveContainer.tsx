import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ModalRef } from "../components/CustomModal";
import { CellData } from "../components/SudokuBox";
import { CellRef } from "../components/SudokuGrid";
import colors from "../constants/colors";
import { MAX_SOLVING_TIME } from "../constants/consts";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import {
  arrayEquals,
  msToMinutesAndSeconds,
  onValueEnter,
} from "../helpers/functions";
import { goToHomePage } from "../helpers/navigation";
import { columnFromIndex, rowFromIndex } from "../helpers/sudokuConstraints";
import { showNotification } from "../redux/notification/notificationRedux";
import { RootState } from "../redux/store";
import SolveScreen from "../screens/SolveScreen";
import service from "../service/service";

export const ratingFields = {
  stars: "stars",
};

const SolveContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const formMethods = useForm();
  const rating = formMethods.watch(ratingFields.stars);
  const user = useSelector((state: RootState) => state.auth.user);
  const focusedRef = React.useRef<CellRef>();
  const modalRef = React.useRef<ModalRef>();
  const [sudoku, setSudoku] = React.useState<CellData[][]>([]);
  const [initialBoard, setInitialBoard] = React.useState<number[][]>([]);
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);
  const [time, setTime] = React.useState<number>(0);
  const [start, setStart] = React.useState<boolean>(false);
  const [solved, setSolved] = React.useState<number | undefined>();
  const [pencilMode, setPencilMode] = React.useState<boolean>(false);
  const [goBackEnabled, setGoBackEnabled] = React.useState<boolean>(false);
  console.log(rating);
  const errors = React.useMemo(
    () => sudoku.flat().filter((item) => item.error).length > 0,
    [sudoku]
  );

  React.useEffect(() => {
    if (user) {
      service
        .checkAlreadySolved(parseInt(id), user.username)
        .then((res) => setSolved(res));
    }
  }, [user, id]);

  React.useEffect(() => {
    if (!solved) setStart(true);
  }, [solved]);

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
          setInitialBoard(res.board);
        })
        .catch((e) => goToHomePage(history));
    }
  }, [id, history]);

  const checkSolvedSudoku = React.useCallback(() => {
    if (start) {
      service.getSolution(initialBoard, type.identifier).then((res) => {
        const userSolved = sudoku.map((item) => item.map((x) => x.value));

        if (arrayEquals(res, userSolved)) {
          dispatch(
            showNotification({
              message: "Solution is correct!",
              color: colors.white,
              backgroundColor: colors.green,
            })
          );

          setSudoku((prev) => {
            const copy = prev.map((a) =>
              a.map((item) => Object.assign(item, (item.disabled = true)))
            );
            return copy;
          });
          if (user && !solved) {
            modalRef.current?.openDialog();
          }
          setGoBackEnabled(true);
        }
      });
      setStart(false);
    }
  }, [user, start, solved, sudoku, dispatch, initialBoard]);

  React.useEffect(() => {
    if (sudoku.length > 0 && !sudoku.flat().find((item) => !item.value)) {
      if (!errors) {
        checkSolvedSudoku();
      }
    }
  }, [sudoku, errors, checkSolvedSudoku]);

  React.useEffect(() => {
    if (start && !solved) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start, solved]);

  const onKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === "p" || e.key === "P") setPencilMode((prev) => !prev);
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

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
        const data = sudoku.map((a) => a.map((item: any) => ({ ...item })));

        if (pencilMode && !sudoku[row][column].disabled) {
          focusedRef.current?.setPencilTrigger((prev) => {
            let copy = [...prev];
            copy[index] = true;
            return copy;
          });
          focusedRef.current?.setPencilValues((prev) => {
            let copy = prev.map((a) => [...a]);

            copy[index] = [...copy[index], number];
            return copy;
          });
          data[row][column].value = 0;
          const board = onValueEnter(data, row, column, "0", type);
          setSudoku(board);
        } else {
          focusedRef.current?.setPencilTrigger((prev) => {
            let copy = [...prev];
            copy[index] = false;
            return copy;
          });

          if (!sudoku[row][column].disabled) {
            const board = onValueEnter(data, row, column, number, type);
            setSudoku(board);
          }
        }
      }
    },
    [sudoku, type, pencilMode]
  );

  const togglePencilMode = React.useCallback(
    () => setPencilMode((prev) => !prev),
    []
  );

  const saveSolved = React.useCallback(() => {
    if (user && !solved && rating) {
      service
        .saveSolved(
          parseInt(id),
          user?.username,
          time >= MAX_SOLVING_TIME ? MAX_SOLVING_TIME : time,
          rating
        )
        .catch((e) => console.log(e));
      modalRef.current?.closeDialog();
    }
  }, [user, solved, id, modalRef, rating, time]);

  const goHome = React.useCallback(() => goToHomePage(history), [history]);

  return (
    <FormProvider {...formMethods}>
      <SolveScreen
        type={type}
        focusedRef={focusedRef}
        sudoku={sudoku}
        pencilMode={pencilMode}
        solvedTime={solved}
        goBackEnabled={goBackEnabled}
        modalRef={modalRef}
        time={msToMinutesAndSeconds(time)}
        enterNumber={writeInFocused}
        checkConstraints={checkConstraints}
        togglePencilMode={togglePencilMode}
        saveSolved={saveSolved}
        goToHomepage={goHome}
      />
    </FormProvider>
  );
};

export default SolveContainer;
