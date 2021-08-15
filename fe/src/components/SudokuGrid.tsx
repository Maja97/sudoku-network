import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import SudokuBox, { CellProps } from "./SudokuBox";

interface Props {
  data: CellProps[][];
  type: SudokuTypeProps;
}

const SudokuGrid = ({ data, type }: Props) => {
  const classes = useStyles();

  const boxData = React.useMemo(() => {
    return [...Array(type.size).keys()].map((item) => {
      const start = Math.floor(item / type.boxRows) * type.boxRows;
      const start2 = (item % type.boxRows) * type.boxColumns;
      return data
        .slice(start, start + type.boxRows)
        .map((i) => i.slice(start2, start2 + type.boxColumns));
    });
  }, [data, type.boxColumns, type.boxRows, type.size]);

  const rows = React.useMemo(
    () =>
      boxData.map((box, index) => {
        return (
          <div
            className={
              type.breaks.includes(index) ? classes.clear : classes.left
            }
            key={`box-${index}`}
          >
            <SudokuBox data={box} index={index} type={type} key={index} />
          </div>
        );
      }),
    [boxData, type.breaks, classes.left, classes.clear]
  );

  return <Box>{rows}</Box>;
};

const useStyles = makeStyles({
  left: {
    float: "left",
  },
  clear: {
    clear: "left",
    float: "left",
  },
});

export default SudokuGrid;
