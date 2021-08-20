import { CellData } from "../components/SudokuBox";

export interface Sudoku {
  board: CellData[][];
}

export function sudokuFromJSON(maybe: any): Sudoku {
  if (!maybe) throw Error("Object must exist");
  return {
    board: maybe.board,
  };
}

export function sudokuToJSON(sudoku: Sudoku) {
  return {
    board: sudoku.board,
  };
}
