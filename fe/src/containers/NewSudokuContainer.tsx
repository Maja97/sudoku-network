import React from "react";
import NewSudokuScreen from "../screens/NewSudokuScreen";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { CellData } from "../components/SudokuBox";
import { FormProvider, useForm } from "react-hook-form";
import { generateEmptyGrid } from "../helpers/game";
import service from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../redux/notification/notificationRedux";
import { AppDispatch, RootState } from "../redux/store";
import colors from "../constants/colors";
import { goToHomePage, goToLogin } from "../helpers/navigation";
import { useHistory, useLocation } from "react-router-dom";
import { setBoard } from "../redux/board/boardRedux";
import { toBlob } from "html-to-image";
import { Sudoku } from "../types/Sudoku";
import { ModalRef } from "../components/CustomModal";
import { onValueEnter } from "../helpers/functions";
import { columnFromIndex, rowFromIndex } from "../helpers/sudokuConstraints";
import { CellRef } from "../components/SudokuGrid";
import dayjs from "dayjs";

export type SudokuData = {
  name: string;
  publish: boolean;
};

export const saveSudokuFields = {
  name: "name",
  publish: "publish",
};

export interface NewSudokuLocationProps {
  board: CellData[][];
  type: SudokuTypeProps;
}

const NewSudokuContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation<NewSudokuLocationProps>();
  const [data, setData] = React.useState<CellData[][]>([]);
  const [unique, setUnique] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<ModalRef>();
  const focusedRef = React.useRef<CellRef>();

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const formMethods = useForm();

  const [sudokuTypeName, setSudokuTypeName] = React.useState<string>(
    sudokuType.standard.name
  );
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);
  const errors = React.useMemo(
    () => data.flat().filter((item) => item.error).length > 0,
    [data]
  );

  const onCheckUnique = React.useCallback(async () => {
    let board = data.map((item) => item.map((x) => x.value));
    if (errors)
      dispatch(
        showNotification({
          message: "There are errors in the grid. Try again",
          color: colors.darkBlueGrey,
          backgroundColor: colors.white,
        })
      );
    else {
      await service
        .isUnique({ board: board, count: 0, type: type, row: 0, col: 0 })
        .then((res) => {
          if (!res)
            dispatch(
              showNotification({
                message: "Sudoku does not have a unique solution",
                color: colors.darkBlueGrey,
                backgroundColor: colors.white,
              })
            );
          setUnique(res);
        })
        .catch((e) => {
          dispatch(
            showNotification({
              message: "An error occured, try again",
              color: colors.darkBlueGrey,
              backgroundColor: colors.white,
            })
          );
        });
    }
  }, [type, data, dispatch, errors]);

  React.useEffect(() => {
    if (location.state && location.state.board && location.state.type) {
      setData(location.state.board);
      setType(location.state.type);
      setSudokuTypeName(location.state.type.name);
    } else setData(generateEmptyGrid(type));
  }, [location.state, type]);

  const onTypeChange = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setUnique(false);
      setSudokuTypeName(event.target.value as string);
      const newType = Object.values(sudokuType).find(
        (item) => item.name === event.target.value
      );
      if (newType) {
        setType(newType);
        setData(generateEmptyGrid(newType));
      }
      formMethods.reset();
    },
    [formMethods]
  );

  const checkConstraints = React.useCallback(
    (value: string, row: number, column: number) => {
      setUnique(false);
      const copy = data.map((a) => a.map((item: any) => ({ ...item })));
      const board = onValueEnter(copy, row, column, value, type);
      setData(board);
    },
    [type, data]
  );

  const onSaveSudoku = React.useCallback(
    async (fieldData: SudokuData) => {
      const board = data.map((item) => item.map((x) => x.value));
      let binaryData: string | ArrayBuffer | null = "";
      if (ref.current)
        await toBlob(ref.current)
          .then((item) => {
            const reader = new FileReader();
            if (item) {
              reader.readAsDataURL(item);
              reader.onloadend = () => {
                if (reader.result) binaryData = reader.result;
                const sudoku: Sudoku = {
                  type: type.identifier,
                  board: board,
                  boardImage: binaryData,
                  username: user ? user.username : null,
                  boardName: fieldData.name,
                  dateTime: fieldData.publish
                    ? dayjs().format("YYYY-MM-DD HH:mm:ss")
                    : undefined,
                  published: fieldData.publish ? 1 : 0,
                };
                service
                  .saveSudoku(sudoku)
                  .then((res) => {
                    if (modalRef.current) modalRef.current.closeDialog();
                    goToHomePage(history);
                  })
                  .catch((err) => {
                    if (modalRef.current) modalRef.current.closeDialog();
                  });
              };
            }
          })
          .catch((e) => console.log(e));
    },
    [data, user, type.identifier, history]
  );

  const navigateToLogin = React.useCallback(() => {
    dispatch(setBoard({ board: data, type: type }));
    goToLogin(history, true);
  }, [data, dispatch, history, type]);

  const writeInFocused = React.useCallback(
    (number: string) => {
      const index = focusedRef.current?.getFocusedIndex();
      if (index && index !== -1) {
        const row = rowFromIndex(index, type.size);
        const column = columnFromIndex(index, type.size);
        const copy = data.map((a) => a.map((item: any) => ({ ...item })));
        const board = onValueEnter(copy, row, column, number, type);
        setData(board);
      }
    },
    [data, type]
  );

  return (
    <FormProvider {...formMethods}>
      <NewSudokuScreen
        data={data}
        sudokuTypeName={sudokuTypeName}
        type={type}
        unique={unique}
        user={user}
        imageRef={ref}
        modalRef={modalRef}
        focusedRef={focusedRef}
        onTypeChange={onTypeChange}
        onCheckUnique={onCheckUnique}
        checkConstraints={checkConstraints}
        onSaveSudoku={formMethods.handleSubmit(onSaveSudoku)}
        goToLogin={navigateToLogin}
        enterNumber={writeInFocused}
      />
    </FormProvider>
  );
};

export default NewSudokuContainer;
