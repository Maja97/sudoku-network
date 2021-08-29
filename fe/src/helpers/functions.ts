import { CellData } from "../components/SudokuBox";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import { checkForConstraints } from "./sudokuConstraints";

export const extractValues = (board: any[]) =>
  board.map((item) => item.map((x: any) => x.value));

export const checkAllowedValue = (value: string, type: SudokuTypeProps) =>
  new RegExp("^[1-" + type.size + "]$").test(value);

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

export const msToMinutesAndSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const arrayEquals = (a: number[][], b: number[][]) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, row) => val.every((item, col) => item === b[row][col]));
