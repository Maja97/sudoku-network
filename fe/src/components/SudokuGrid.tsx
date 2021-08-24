import { makeStyles } from "@material-ui/core";
import React from "react";
import { createRef } from "react";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import SudokuBox, { CellData } from "./SudokuBox";
import { Arrows } from "./SudokuCell";

export interface CellRef {
  getFocusedIndex: () => number;
}

interface Props {
  data: CellData[][];
  type: SudokuTypeProps;
  imageRef?: any;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SudokuGrid = (
  { data, type, imageRef, checkConstraints }: Props,
  ref: any
) => {
  const classes = useStyles();
  const [focused, setFocused] = React.useState<any>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(0);

  React.useImperativeHandle(ref, (): CellRef => ({ getFocusedIndex }));

  const getFocusedIndex = React.useCallback(() => focusedIndex, [focusedIndex]);

  React.useEffect(() => {
    const newFocused = Array(type.size * type.size)
      .fill(0)
      .map((_, i) => focused[i] || createRef());
    setFocused(newFocused);
  }, [type.size]);

  const onSetFocus = React.useCallback(
    (cellIndex: number, key?: string) => {
      if (key) {
        if (key === Arrows.ArrowLeft) {
          if (cellIndex % type.size) {
            focused[cellIndex - 1].current.focus();
          } else focused[cellIndex + (type.size - 1)].current.focus();
        } else if (key === Arrows.ArrowRight) {
          if ((cellIndex + 1) % type.size === 0)
            focused[cellIndex - (type.size - 1)].current.focus();
          else focused[cellIndex + 1].current.focus();
        } else if (key === Arrows.ArrowDown) {
          if (cellIndex >= type.size * (type.size - 1))
            focused[cellIndex % (type.size * (type.size - 1))].current.focus();
          else focused[cellIndex + type.size].current.focus();
        } else if (key === Arrows.ArrowUp) {
          if (cellIndex >= type.size)
            focused[cellIndex - type.size].current.focus();
          else focused[type.size * (type.size - 1) + cellIndex].current.focus();
        }
      } else {
        setFocusedIndex(cellIndex);
      }
    },
    [type.size, focused]
  );

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
              focused={focused}
              onSetFocus={onSetFocus}
              checkConstraints={checkConstraints}
            />
          </div>
        );
      }),
    [
      boxData,
      classes.left,
      classes.clear,
      type,
      focused,
      checkConstraints,
      onSetFocus,
    ]
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

export default React.forwardRef(SudokuGrid);
