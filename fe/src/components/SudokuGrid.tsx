import { makeStyles } from "@material-ui/core";
import React from "react";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import SudokuBox, { CellData } from "./SudokuBox";

interface Props {
  data: CellData[][];
  type: SudokuTypeProps;
  imageRef?: any;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SudokuGrid = ({ data, type, imageRef, checkConstraints }: Props) => {
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
            style={{ backgroundColor: "black" }}
            className={
              type.breaks.includes(index) ? classes.clear : classes.left
            }
            key={`box-${index}`}
          >
            <SudokuBox
              data={box}
              index={index}
              type={type}
              key={index}
              checkConstraints={checkConstraints}
            />
          </div>
        );
      }),
    [boxData, classes.left, classes.clear, type, checkConstraints]
  );

  return <div ref={imageRef}>{rows}</div>;
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
