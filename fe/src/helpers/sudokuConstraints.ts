import { CellData } from "../components/SudokuBox";
import { SudokuTypeProps, SudokuGridType } from "../constants/sudokuTypes";

export const generateEmptyGrid = (
  sudokuType: SudokuTypeProps
): CellData[][] => {
  return Array(sudokuType.size)
    .fill(0)
    .map(() =>
      Array(sudokuType.size).fill({ value: 0, error: false, disabled: false })
    );
};

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
    checkBox(grid, value, rowIndex, columnIndex, sudokuType) &&
    (sudokuType.identifier === SudokuGridType.X
      ? checkDiagonals(grid, value, rowIndex, columnIndex, sudokuType)
      : true)
  );
};

export const checkDiagonals = (
  grid: CellData[][],
  value: number,
  rowIndex: number,
  columnIndex: number,
  sudokuType: SudokuTypeProps
) => {
  if (
    rowIndex === columnIndex &&
    rowIndex === sudokuType.size - columnIndex - 1
  ) {
    const bothDiagonals = grid
      .map((item, row) =>
        item.filter(
          (number, column) =>
            column === row || row === sudokuType.size - column - 1
        )
      )
      .flat()
      .map((item) => item.value);

    return bothDiagonals.filter((item) => item === value).length <= 1;
  } else if (rowIndex === columnIndex) {
    const mainDiagonal = grid
      .map((item, row) => item.filter((number, column) => column === row))
      .flat()
      .map((item) => item.value);
    return mainDiagonal.filter((item) => item === value).length <= 1;
  } else if (rowIndex === sudokuType.size - columnIndex - 1) {
    const secondaryDiagonal = grid
      .map((item, row) =>
        item.filter((number, column) => row === sudokuType.size - column - 1)
      )
      .flat()
      .map((item) => item.value);
    return secondaryDiagonal.filter((item) => item === value).length <= 1;
  }
  return true;
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
