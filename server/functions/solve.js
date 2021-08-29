const boxSizes = {
  6: [2, 3],
  9: [3, 3],
};

const getBoxSize = (size) => boxSizes[size];

const getBoxStartEnd = (i, j, size) => {
  const [boxSizeRows, boxSizeCols] = getBoxSize(size);
  const boxStartRow = Math.floor(i / boxSizeRows) * boxSizeRows;
  const boxEndRow = boxStartRow + boxSizeRows;
  const boxStartCol = Math.floor(j / boxSizeCols) * boxSizeCols;
  const boxEndCol = boxStartCol + boxSizeCols;
  return [boxStartRow, boxEndRow, boxStartCol, boxEndCol];
};

const splice = (
  array,
  val,
  startRow,
  endRow,
  startCol,
  endCol,
  start_z,
  end_z
) => {
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      for (let z = start_z; z < end_z; z++) {
        array[i][j][z] = val;
      }
    }
  }
  return array;
};

const updatePossibilities = (possibilities, entry) => {
  let [i, j, val] = entry;
  val--;
  const size = possibilities.length;
  possibilities = splice(possibilities, 0, i, i + 1, 0, size, val, val + 1);
  possibilities = splice(possibilities, 0, 0, size, j, j + 1, val, val + 1);
  const [boxStartRow, boxEndRow, boxStartCol, boxEndCol] = getBoxStartEnd(
    i,
    j,
    size
  );
  possibilities = splice(
    possibilities,
    0,
    boxStartRow,
    boxEndRow,
    boxStartCol,
    boxEndCol,
    val,
    val + 1
  );
  possibilities[i][j] = Array(size).fill(0);
  return possibilities;
};

const getPossibilites = (grid) => {
  const size = grid.length;
  let possibilities = JSON.parse(
    JSON.stringify(Array(size).fill(Array(size).fill(Array(size).fill(1))))
  );
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j]) {
        possibilities = updatePossibilities(possibilities, [i, j, grid[i][j]]);
      }
    }
  }
  return possibilities;
};

const getNakedPair = (vals) => {
  let index = null;
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] === 1) {
      if (index === null) {
        index = i;
      } else {
        return false;
      }
    }
  }
  if (index === null) {
    return false;
  }
  return index;
};

const checkNakedSingles = (possibilities) => {
  let foundSingles = new Array();
  const size = possibilities.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const single = getNakedPair(possibilities[i][j]);
      if (single) foundSingles.push([i, j, single + 1]);
    }
  }
  return foundSingles;
};

const getHiddenPair = (
  possibilities,
  startRow,
  endRow,
  startCol,
  endCol,
  val
) => {
  let index = null;
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (possibilities[i][j][val] === 1) {
        if (index === null) {
          index = [i, j];
        } else {
          return false;
        }
      }
    }
  }
  return index;
};

const checkHiddenSingles = (possibilities) => {
  const foundSingles = new Array();
  const size = possibilities.length;
  const [boxSizeRows, boxSizeCols] = getBoxSize(size);
  for (let it = 0; it < size; it++) {
    const boxStartRow = Math.floor(it / boxSizeRows) * boxSizeRows;
    const boxEndRow = boxStartRow + boxSizeRows;
    const boxStartCol = (it % (size / boxSizeCols)) * boxSizeCols;
    const boxEndCol = boxStartCol + boxSizeCols;
    for (let val = 0; val < size; val++) {
      let single = getHiddenPair(possibilities, 0, size, it, it + 1, val);
      if (single) foundSingles.push([...single, val + 1]);
      single = getHiddenPair(possibilities, it, it + 1, 0, size, val);
      if (single) foundSingles.push([...single, val + 1]);
      single = getHiddenPair(
        possibilities,
        boxStartRow,
        boxEndRow,
        boxStartCol,
        boxEndCol,
        val
      );
      if (single) foundSingles.push([...single, val + 1]);
    }
  }
  return Array.from(new Set(foundSingles.map(JSON.stringify)), JSON.parse);
};

const checkSingles = (possibilities) => {
  const foundSingles = checkNakedSingles(possibilities);
  foundSingles.push(...checkHiddenSingles(possibilities));
  return Array.from(new Set(foundSingles.map(JSON.stringify)), JSON.parse);
};

const isIn2d = (array, startRow, endRow, startCol, endCol, val) => {
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (array[i][j] === val) {
        return true;
      }
    }
  }
  return false;
};

const isIn3d = (
  array,
  startRow,
  endRow,
  startCol,
  endCol,
  start_z,
  end_z,
  val
) => {
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      for (let z = start_z; z < end_z; z++) {
        if (array[i][j][z] === val) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkDeadEnd = (grid, possibilities) => {
  const size = grid.length;
  const [boxSizeRows, boxSizeCols] = getBoxSize(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (
        grid[i][j] === 0 &&
        !isIn3d(possibilities, i, i + 1, j, j + 1, 0, size, 1)
      ) {
        return true;
      }
    }
  }
  for (let it = 0; it < size; it++) {
    const boxStartRow = Math.floor(it / boxSizeRows) * boxSizeRows;
    const boxEndRow = boxStartRow + boxSizeRows;
    const boxStartCol = (it % (size / boxSizeCols)) * boxSizeCols;
    const boxEndCol = boxStartCol + boxSizeCols;
    const checkRow = isIn2d(grid, it, it + 1, 0, size, 0);
    const checkCol = isIn2d(grid, 0, size, it, it + 1, 0);
    const checkBox = isIn2d(
      grid,
      boxStartRow,
      boxEndRow,
      boxStartCol,
      boxEndCol,
      0
    );
    for (let val = 0; val < size; val++) {
      if (checkRow) {
        if (!isIn2d(grid, it, it + 1, 0, size, val + 1)) {
          if (!isIn3d(possibilities, it, it + 1, 0, size, val, val + 1, 1)) {
            return true;
          }
        }
      }
      if (checkCol) {
        if (!isIn2d(grid, 0, size, it, it + 1, val + 1)) {
          if (!isIn3d(possibilities, 0, size, it, it + 1, val, val + 1, 1)) {
            return true;
          }
        }
      }
      if (checkBox) {
        if (
          !isIn2d(grid, boxStartRow, boxEndRow, boxStartCol, boxEndCol, val + 1)
        ) {
          if (
            !isIn3d(
              possibilities,
              boxStartRow,
              boxEndRow,
              boxStartCol,
              boxEndCol,
              val,
              val + 1,
              1
            )
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const countUnique = (grid, startRow, endRow, startCol, endCol) => {
  const array = new Array();
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      array.push(grid[i][j]);
    }
  }
  return new Set(array).size;
};

const checkMistake = (grid) => {
  const size = grid.length;
  const [boxSizeRows, boxSizeCols] = getBoxSize(size);
  for (let it = 0; it < size; it++) {
    const boxStartRow = Math.floor(it / boxSizeRows) * boxSizeRows;
    const boxEndRow = boxStartRow + boxSizeRows;
    const boxStartCol = (it % (size / boxSizeCols)) * boxSizeCols;
    const boxEndCol = boxStartCol + boxSizeCols;
    if (countUnique(grid, it, it + 1, 0, size) !== size) return true;
    if (countUnique(grid, 0, size, it, it + 1) !== size) return true;
    if (
      countUnique(grid, boxStartRow, boxEndRow, boxStartCol, boxEndCol) !== size
    )
      return true;
  }
  return false;
};

const getBestCell = (possibilities) => {
  const size = possibilities.length;
  let bestIndex = null;
  let bestCount = size + 1;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const count = possibilities[i][j].reduce((a, b) => a + b, 0);
      if (count !== 0 && count < bestCount) {
        bestCount = count;
        bestIndex = [i, j];
      }
    }
  }
  return bestIndex;
};

const getPossibleCellValues = (cellPossibilities) => {
  const size = cellPossibilities.length;
  const possibleCellValues = new Array();
  for (let val = 0; val < size; val++) {
    if (cellPossibilities[val]) possibleCellValues.push(val + 1);
  }
  return possibleCellValues;
};

const solve = (grid, possibilities) => {
  if (checkDeadEnd(grid, possibilities)) return new Array();
  const solutions = new Array();
  let currPosibilities = JSON.parse(JSON.stringify(possibilities));
  let currGrid = JSON.parse(JSON.stringify(grid));
  const size = grid.length;
  while (true) {
    const singles = checkSingles(currPosibilities);
    if (!singles.length) break;
    for (let single of singles) {
      const [i, j, val] = single;
      currGrid[i][j] = val;
      currPosibilities = updatePossibilities(currPosibilities, single);
    }
  }
  if (!isIn3d(currPosibilities, 0, size, 0, size, 0, size, 1)) {
    if (checkDeadEnd(currGrid, currPosibilities)) return solutions;
    if (checkMistake(currGrid)) return solutions;
    solutions.push(currGrid);
  } else {
    const bestIndex = getBestCell(currPosibilities);
    const [i, j] = bestIndex;
    const vals = getPossibleCellValues(currPosibilities[i][j]);
    for (let val of vals) {
      const gridCopy = JSON.parse(JSON.stringify(currGrid));
      gridCopy[i][j] = val;
      const possibilitiesCopy = updatePossibilities(
        JSON.parse(JSON.stringify(currPosibilities)),
        [i, j, val]
      );
      const newSolutions = solve(gridCopy, possibilitiesCopy);
      if (newSolutions.length) {
        for (let solution of newSolutions) {
          solutions.push(solution);
        }
      }
      if (solutions.length >= 10) break;
    }
  }
  return solutions;
};

const solveWrapper = (grid) => {
  return solve(grid, getPossibilites(grid));
};

export default solveWrapper;
