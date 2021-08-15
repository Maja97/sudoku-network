export function isUnique(board, count, type, row, col) {
  if (count > 1) return count;
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

export const checkForConstraints = (
  grid,
  rowIndex,
  columnIndex,
  sudokuType,
  value
) => {
  return (
    checkRow(grid, value, rowIndex) &&
    checkColumn(grid, value, columnIndex) &&
    checkBox(grid, value, rowIndex, columnIndex, sudokuType)
  );
};

export const checkRow = (grid, value, rowIndex) =>
  grid[rowIndex].every((item) => item.value !== value);

export const checkColumn = (grid, value, columnIndex) => {
  return grid.every((item) => item[columnIndex].value !== value);
};

export const checkBox = (grid, value, row, column, sudokuType) => {
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
