import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import SudokuCell from "./SudokuCell";
import { SudokuGridType, SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  data: CellData[][];
  index: number;
  type: SudokuTypeProps;
  focused: React.Ref<any>;
  pencilMode?: boolean;
  pencilValues?: string[][];
  pencilTrigger?: boolean[];
  setPencilTrigger?: React.Dispatch<React.SetStateAction<boolean[]>>;
  setPencilValues?: React.Dispatch<React.SetStateAction<string[][]>>;
  checkConstraints: (value: string, row: number, column: number) => void;
  onSetFocus: (cellIndex: number, key?: string) => void;
}

export interface CellData {
  value: number;
  disabled: boolean;
  error: boolean;
}

const SudokuBox = ({
  data,
  index,
  type,
  focused,
  pencilMode,
  pencilValues,
  pencilTrigger,
  setPencilValues,
  setPencilTrigger,
  onSetFocus,
  checkConstraints,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      {data.map((item, boxRow) => (
        <div
          style={{ display: "flex", height: "50px" }}
          key={`cellRow-${boxRow}`}
        >
          {item.map((cell, boxCol) => {
            const row =
              Math.floor(index / type.boxRows) * type.boxRows + boxRow;
            const column = (index % type.boxRows) * type.boxColumns + boxCol;
            const cellIndex = row * type.size + column;
            let isX = false;
            if (type.identifier === SudokuGridType.X) {
              if (row === column || row === type.size - column - 1) isX = true;
            }
            return (
              <SudokuCell
                cellValue={cell.value}
                type={type}
                isX={isX}
                disabled={cell.disabled}
                cellError={cell.error}
                cellIndex={cellIndex}
                setFocused={onSetFocus}
                focused={focused}
                pencilMode={pencilMode}
                setPencilTrigger={setPencilTrigger}
                pencilTrigger={pencilTrigger ? pencilTrigger[cellIndex] : false}
                pencilValues={pencilValues ? pencilValues[cellIndex] : []}
                setPencilValues={setPencilValues}
                cellKey={`${index}-${boxRow}-${boxCol}`}
                key={`${index}-${boxRow}-${boxCol}`}
                name={`${type.name}[${index}-${boxRow}-${boxCol}]`}
                checkConstraints={(value) => {
                  checkConstraints(value, row, column);
                }}
              />
            );
          })}
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
