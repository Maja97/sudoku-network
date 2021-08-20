import { SudokuTypeProps } from "../constants/sudokuTypes";

export const extractValues = (board: any[]) =>
  board.map((item) => item.map((x: any) => x.value));

export const checkAllowedValue = (value: string, type: SudokuTypeProps) =>
  new RegExp("^[0-" + type.size + "]$").test(value);
