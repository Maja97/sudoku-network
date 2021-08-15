export const SudokuGridType = {
  STANDARD: "STANDARD",
};

export interface SudokuTypeProps {
  name: string;
  boxRows: number;
  boxColumns: number;
  size: number;
  breaks: number[];
}

export interface SudokuTypeInterface {
  [key: string]: SudokuTypeProps;
}

export const sudokuType: SudokuTypeInterface = {
  small: {
    name: "6x6",
    size: 6,
    boxColumns: 3,
    boxRows: 2,
    breaks: [2, 4],
  },
  standard: {
    name: "Standard",
    boxRows: 3,
    boxColumns: 3,
    size: 9,
    breaks: [3, 6],
  },
  xSudoku: {
    name: "X-Sudoku",
    size: 9,
    boxRows: 3,
    boxColumns: 3,
    breaks: [3, 6],
  },
};
