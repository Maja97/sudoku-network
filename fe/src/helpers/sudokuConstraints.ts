import { CellProps } from "../components/SudokuBox";
import { SudokuTypeProps } from "../constants/sudokuTypes";

export const checkForConstraints = (
  grid: CellProps[][],
  rowIndex: number,
  columnIndex: number,
  sudokuType: SudokuTypeProps,
  value: number
) => {
  return (
    checkRow(grid, value, rowIndex) &&
    checkColumn(grid, value, columnIndex) &&
    checkBox(grid, value, rowIndex, columnIndex, sudokuType)
  );
};

export const checkRow = (
  grid: CellProps[][],
  value: number,
  rowIndex: number
) => grid[rowIndex].every((item) => item.value !== value);

export const checkColumn = (
  grid: CellProps[][],
  value: number,
  columnIndex: number
) => {
  return grid.every((item) => item[columnIndex].value !== value);
};

export const checkBox = (
  grid: CellProps[][],
  value: number,
  row: number,
  column: number,
  sudokuType: SudokuTypeProps
) => {
  const boxStartRow = Math.floor(row / sudokuType.boxRows) * sudokuType.boxRows;
  const boxStartColumn =
    Math.floor(column / sudokuType.boxColumns) * sudokuType.boxColumns;
  const box = grid
    .slice(boxStartRow, boxStartRow + sudokuType.boxRows)
    .map((item) => {
      return item.slice(boxStartColumn, boxStartColumn + sudokuType.boxColumns);
    });
  return box.every((item) => item.every((x) => x.value !== value));
};

export const rowFromIndex = (index: number, gridSize: number) =>
  Math.floor(index / gridSize);

export const columnFromIndex = (index: number, gridSize: number) =>
  index % gridSize;
