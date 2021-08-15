import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SudokuCell from "./SudokuCell";
import { SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  data: CellProps[][];
  index: number;
  type: SudokuTypeProps;
}

export interface CellProps {
  value: number;
  disabled: boolean;
  error: boolean;
}

const SudokuBox = ({ data, index, type }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      {data.map((item, boxRow) => (
        <div style={{ display: "flex" }} key={`cellRow-${boxRow}`}>
          {item.map((cell, boxCol) => (
            <SudokuCell
              disabled={cell.disabled}
              cellError={cell.error}
              cellKey={`${index}-${boxRow}-${boxCol}`}
              key={`${index}-${boxRow}-${boxCol}`}
              name={`${index}-${boxRow}-${boxCol}`}
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
