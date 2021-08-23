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
  type: SudokuTypeProps;
  checkConstraints: (value: string) => void;
}

const SudokuCell = ({
  disabled,
  name,
  cellError,
  cellValue,
  cellKey,
  type,
  checkConstraints,
}: Props) => {
  const classes = useStyles({ error: cellError });
  const { control } = useFormContext();

  return (
    <Box className={classes.square} key={cellKey}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange } }) => (
          <TextField
            disabled={disabled}
            value={cellValue ? cellValue : ""}
            inputProps={{ maxLength: 1 }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.text,
                focused: classes.focused,
                disabled: classes.disabled,
              },
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={(e) => {
              onChange(e);
              let value = e.nativeEvent.key;
              if (value === BACKSPACE) value = "";
              if (checkAllowedValue(value, type) || value === "")
                checkConstraints(value);
            }}
            className={classes.input}
          />
        )}
      />
    </Box>
  );
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
    backgroundColor: colors.lightBlue,
  },
  disabled: {
    backgroundColor: colors.lightestGrey,
  },
});

export default SudokuCell;
