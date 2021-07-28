import React from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  cellValue: number;
  disabled: boolean;
  cellError: boolean;
  name: string;
  cellKey: string;
  onCellChange: (value: number) => void;
}

const SudokuCell = ({
  cellValue,
  disabled,
  name,
  cellError,
  cellKey,
  onCellChange,
}: Props) => {
  const classes = useStyles({ error: cellError });
  const { control } = useFormContext();

  return (
    <Box className={classes.square} key={cellKey}>
      <Controller
        name={name}
        control={control}
        defaultValue={cellValue === 0 ? "" : cellValue}
        render={({ field: { value, onChange } }) => (
          <TextField
            disabled={disabled}
            value={cellValue === 0 ? "" : value}
            inputProps={{ maxLength: 1 }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.text,
                focused: classes.focused,
              },
            }}
            onChange={(e) => {
              onChange(e);
              onCellChange(parseInt(e.target.value));
            }}
            onFocus={(e) => {
              e.target.select();
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
    height: "50px",
    position: "relative",
    display: "flex",
    textAlignLast: "center",
    border: "1px solid black",
    boxSizing: "content-box",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
  input: (props: StyleProps) => ({
    backgroundColor: props.error ? "#EF5350" : undefined,
    caretColor: "transparent",
  }),
  text: {
    height: "100%",
    textAlign: "center",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
  focused: {
    backgroundColor: "blue",
  },
});

export default SudokuCell;