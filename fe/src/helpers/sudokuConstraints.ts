import { CellData } from "../components/SudokuBox";
import { SudokuTypeProps } from "../constants/sudokuTypes";

export const checkForConstraints = (
  grid: CellData[][],
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
  grid: CellData[][],
  value: number,
  rowIndex: number
) => {
  return grid[rowIndex].filter((item) => item.value === value).length <= 1;
};

export const checkColumn = (
  grid: CellData[][],
  value: number,
  columnIndex: number
) => {
  return grid.filter((item) => item[columnIndex].value === value).length <= 1;
};

export const checkBox = (
  grid: CellData[][],
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
  return box.flat().filter((item) => item.value === value).length <= 1;
};

export const rowFromIndex = (index: number, gridSize: number) =>
  Math.floor(index / gridSize);

export const columnFromIndex = (index: number, gridSize: number) =>
  index % gridSize;
