import { CellProps } from "../components/SudokuBox";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { checkForConstraints } from "./sudokuConstraints";

export const generateEmptyGrid = (
  sudokuType: SudokuTypeProps
): CellProps[][] => {
  return Array(sudokuType.size)
    .fill(0)
    .map(() =>
      Array(sudokuType.size).fill({ value: 0, error: false, disabled: false })
    );
};

export function solveSudoku(board: CellProps[][], type: SudokuTypeProps) {
  let gridFilled = true;
  let row = -1;
  let col = -1;
  const emptyPlace = board.flat().findIndex((item) => item.value === 0);

  if (emptyPlace !== -1) {
    row = Math.floor(emptyPlace / type.size);
    col = emptyPlace % type.size;
    gridFilled = false;
  }

  if (gridFilled) {
    return true;
  }

  const numbers = Array.from({ length: type.size }, (_, i) => i + 1);

  for (const number of numbers) {
    if (checkForConstraints(board, row, col, type, number)) {
      board[row][col].value = number;
      if (solveSudoku(board, type)) {
        return true;
      } else {
        board[row][col].value = 0;
      }
    }
  }
  return false;
}

export function isUnique(
  board: CellProps[][],
  count: number,
  type: SudokuTypeProps,
  row: number,
  col: number
): number {
  if (row === type.size) {
    row = 0;
    if (++col === type.size) return 1 + count;
  }

  if (board[row][col].value !== 0)
    return isUnique(board, count, type, row + 1, col);

  const numbers = Array.from({ length: type.size }, (_, i) => i + 1);

  for (const number of numbers) {
    if (checkForConstraints(board, row, col, type, number)) {
      board[row][col].value = number;
      count = isUnique(board, count, type, row + 1, col);
    }
  }
  board[row][col].value = 0;
  return count;
}

export function solve(board: CellProps[][], n: number) {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j].value === 0) {
        row = i;
        col = j;

        // We still have some remaining
        // missing values in Sudoku
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }

  // No empty space left
  if (isEmpty) {
    return true;
  }

  // Else for each-row backtrack
  for (let num = 1; num <= n; num++) {
    if (checkForConstraints(board, row, col, sudokuType.standard, num)) {
      board[row][col].value = num;
      if (solve(board, n)) {
        return true;
      } else {
        // Replace it
        board[row][col].value = 0;
      }
    }
  }
  return false;
}
