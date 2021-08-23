import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SudokuCell from "./SudokuCell";
import { SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  data: CellData[][];
  index: number;
  type: SudokuTypeProps;
  checkConstraints: (value: string, row: number, column: number) => void;
}

export interface CellData {
  value: number;
  disabled: boolean;
  error: boolean;
}

const SudokuBox = ({ data, index, type, checkConstraints }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      {data.map((item, boxRow) => (
        <div style={{ display: "flex" }} key={`cellRow-${boxRow}`}>
          {item.map((cell, boxCol) => (
            <SudokuCell
              cellValue={cell.value}
              type={type}
              disabled={cell.disabled}
              cellError={cell.error}
              cellKey={`${index}-${boxRow}-${boxCol}`}
              key={`${index}-${boxRow}-${boxCol}`}
              name={`${type.name}[${index}-${boxRow}-${boxCol}]`}
              checkConstraints={(value) => {
                console.log("box");
                const row =
                  Math.floor(index / type.boxRows) * type.boxRows + boxRow;
                const column =
                  (index % type.boxRows) * type.boxColumns + boxCol;
                checkConstraints(value, row, column);
              }}
            />
          ))}
        </div>
      ))}
    </Box>
  );
};

const useStyles = makeStyles({
  box: {
    margin: "1px",
    backgroundColor: "white",
  },
});

export default SudokuBox;
