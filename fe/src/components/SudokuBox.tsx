import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SudokuCell from "./SudokuCell";
import { SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  data: CellProps[][];
  index: number;
  type: SudokuTypeProps;
  onCellChange: (cellIndex: number, value: number) => void;
}

export interface CellProps {
  value: number;
  disabled: boolean;
  error: boolean;
}

const SudokuBox = ({ data, index, type, onCellChange }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      {data.map((item, boxRow) => (
        <div style={{ display: "flex" }} key={`cellRow-${boxRow}`}>
          {item.map((cell, boxCol) => (
            <SudokuCell
              cellValue={cell.value}
              disabled={cell.disabled}
              cellError={cell.error}
              cellKey={`${index}-${boxRow}-${boxCol}`}
              key={`${index}-${boxRow}-${boxCol}`}
              name={`${index}-${boxRow}-${boxCol}`}
              onCellChange={(value: number) => {
                onCellChange(
                  (Math.floor(index / type.boxRows) * type.boxRows + boxRow) *
                    type.size +
                    ((index % type.boxRows) * type.boxColumns + boxCol),
                  value
                );
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
    marginLeft: "1px",
    marginRight: "1px",
    marginTop: "2px",
  },
});

export default SudokuBox;
