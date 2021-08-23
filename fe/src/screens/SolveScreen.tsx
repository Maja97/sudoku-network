import { Box } from "@material-ui/core";
import React from "react";
import { CellData } from "../components/SudokuBox";
import SudokuGrid from "../components/SudokuGrid";
import { SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  sudoku: CellData[][];
  type: SudokuTypeProps;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SolveScreen = ({ sudoku, type, checkConstraints }: Props) => {
  return (
    sudoku && (
      <Box display="flex" justifyContent="center" py={5}>
        <SudokuGrid
          data={sudoku}
          checkConstraints={checkConstraints}
          type={type}
        />
      </Box>
    )
  );
};

export default SolveScreen;
