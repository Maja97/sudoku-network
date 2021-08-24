import React from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import colors from "../constants/colors";
import { checkAllowedValue } from "../helpers/functions";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import { BACKSPACE } from "../constants/consts";

interface Props {
  disabled: boolean;
  cellValue: number;
  cellError: boolean;
  name: string;
  cellKey: string;
  cellIndex: number;
  type: SudokuTypeProps;
  focused: any;
  setFocused: (cellIndex: number, key?: string) => void;
  checkConstraints: (value: string) => void;
}

const SudokuCell = ({
  disabled,
  name,
  cellError,
  cellValue,
  cellKey,
  cellIndex,
  type,
  focused,
  setFocused,
  checkConstraints,
}: Props) => {
  const classes = useStyles({ error: cellError });
  const { control } = useFormContext();

  const onKeyDown = React.useCallback(
    (e) => {
      let value = e.nativeEvent.key;
      if (Object.values(Arrows).includes(value)) {
        setFocused(cellIndex, value);
      } else {
        if (!disabled) {
          if (value === BACKSPACE) value = "";
          if (checkAllowedValue(value, type) || value === "")
            checkConstraints(value);
        }
      }
    },
    [cellIndex, setFocused, type, checkConstraints]
  );

  return (
    <Box className={classes.square} key={cellKey}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange } }) => (
          <TextField
            inputRef={focused[cellIndex]}
            id={`cell-${cellIndex}`}
            value={cellValue ? cellValue : ""}
            inputProps={{ maxLength: 1 }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.text,
                focused: classes.focused,
              },
            }}
            onFocus={(e) => {
              setFocused(cellIndex);
            }}
            onKeyDown={(e) => {
              if (!disabled) onChange(e);
              onKeyDown(e);
            }}
            className={
              disabled ? `${classes.input} ${classes.disabled}` : classes.input
            }
          />
        )}
      />
    </Box>
  );
};

export const Arrows = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
};

interface StyleProps {
  error: boolean;
}

const useStyles = makeStyles({
  square: {
    width: "50px",
    position: "relative",
    display: "flex",
    textAlignLast: "center",
    borderWidth: "1px",
    borderColor: "#292838",
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  input: (props: StyleProps) => ({
    backgroundColor: props.error ? colors.lightRed : undefined,
    caretColor: "transparent",
  }),
  text: (props: StyleProps) => ({
    height: "inherit",
    border: "none",
    textAlign: "center",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: props.error ? colors.red : colors.darkBlueGrey,
    "&::selection": {
      backgroundColor: "transparent",
    },
  }),
  focused: {
    backgroundColor: colors.lightestBlue,
  },
  disabled: {
    backgroundColor: colors.lightestGrey,
  },
});

export default SudokuCell;
