import { CellData } from "../components/SudokuBox";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import { checkForConstraints } from "./sudokuConstraints";

export const extractValues = (board: any[]) =>
  board.map((item) => item.map((x: any) => x.value));

export const checkAllowedValue = (value: string, type: SudokuTypeProps) =>
  new RegExp("^[0-" + type.size + "]$").test(value);

export const onValueEnter = (
  board: CellData[][],
  row: number,
  column: number,
  value: string,
  type: SudokuTypeProps
) => {
  let val;
  Boolean(value) ? (val = parseInt(value)) : (val = 0);
  board[row][column].value = val;
  board.forEach((row, rowIndex) =>
    row.forEach((item, columnIndex) => {
      if (!item.value) board[rowIndex][columnIndex].error = false;
      if (
        item.value &&
        !checkForConstraints(board, rowIndex, columnIndex, type, item.value)
      )
        board[rowIndex][columnIndex].error = true;
      else board[rowIndex][columnIndex].error = false;
    })
  );
  return board;
};
