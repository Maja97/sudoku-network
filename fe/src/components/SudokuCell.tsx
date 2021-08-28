import React from "react";
import { Box, Grid, makeStyles, TextField } from "@material-ui/core";
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
  pencilMode?: boolean;
  pencilValues?: string[];
  pencilTrigger?: boolean;
  setPencilTrigger?: React.Dispatch<React.SetStateAction<boolean[]>>;
  setPencilValues?: React.Dispatch<React.SetStateAction<string[][]>>;
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
  pencilMode,
  pencilValues,
  pencilTrigger,
  setPencilTrigger,
  setPencilValues,
  setFocused,
  checkConstraints,
}: Props) => {
  const classes = useStyles({ error: cellError });
  const { control } = useFormContext();
  const [pencilFocused, setPencilFocused] = React.useState<boolean>(false);
  const [firstRender, setFirstRender] = React.useState<boolean>(true);

  const onKeyDown = React.useCallback(
    (e) => {
      let value = e.nativeEvent.key;
      if (Object.values(Arrows).includes(value)) {
        setFocused(cellIndex, value);
      } else {
        if (!disabled) {
          if (
            pencilMode &&
            setPencilValues &&
            pencilValues &&
            setPencilTrigger
          ) {
            if (value === BACKSPACE)
              setPencilValues((prev) => {
                let copy = prev.map((a) => [...a]);

                copy[cellIndex] = [];
                return copy;
              });
            if (checkAllowedValue(value, type)) {
              if (!pencilValues.includes(value)) {
                const newPencilVals = [...pencilValues, value];
                setPencilValues((prev) => {
                  let copy = prev.map((a) => [...a]);

                  copy[cellIndex] = newPencilVals;
                  return copy;
                });
              }
              checkConstraints("");
              setPencilTrigger((prev) => {
                let copy = [...prev];
                copy[cellIndex] = true;
                return copy;
              });
            }
          } else {
            if (value === BACKSPACE) value = "";
            if (checkAllowedValue(value, type) || value === "")
              checkConstraints(value);
            setPencilTrigger &&
              setPencilTrigger((prev) => {
                let copy = [...prev];
                copy[cellIndex] = false;
                return copy;
              });
          }
        }
      }
    },
    [
      cellIndex,
      setFocused,
      setPencilValues,
      type,
      checkConstraints,
      disabled,
      pencilMode,
      pencilValues,
      setPencilTrigger,
    ]
  );

  const pencilClass = React.useMemo(
    () => (pencilFocused ? classes.div : ""),
    [pencilFocused, classes.div]
  );

  const pencilValuesGrid = React.useMemo(() => {
    return Array(type.boxRows)
      .fill(0)
      .map((_, row) => {
        return (
          <Grid
            container
            style={{ height: "30%" }}
            key={`pencil-values-grid-${row}`}
          >
            {Array(type.boxColumns)
              .fill(0)
              .map((_, col) => {
                const val = (row * type.boxColumns + col + 1).toString();
                return (
                  <Grid item md={4} key={`pencil-values-numbers-${row}-${col}`}>
                    {pencilValues &&
                    pencilValues.length > 0 &&
                    pencilValues.includes(val)
                      ? val
                      : ""}
                  </Grid>
                );
              })}
          </Grid>
        );
      });
  }, [pencilValues, type]);

  React.useEffect(() => {
    if (!firstRender) {
      focused[cellIndex].current.focus();
      if (!pencilTrigger && setPencilValues) {
        setPencilValues((prev) => {
          let copy = prev.map((a) => [...a]);

          copy[cellIndex] = [];
          return copy;
        });
      }
    } else setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pencilTrigger, focused, cellIndex, setPencilValues]);

  return (
    <Box className={classes.square} key={cellKey}>
      {pencilTrigger ? (
        <div
          key={`pencil-marks-${cellKey}`}
          className={pencilClass}
          tabIndex={1}
          style={{
            width: "100%",
            cursor: "pointer",
            height: "100%",
            backgroundColor: "white",
            border: 0,
            outline: "none",
            alignSelf: "baseline",
          }}
          onFocus={() => {
            setPencilFocused(true);
            setFocused(cellIndex);
          }}
          onKeyDown={(e) => {
            onKeyDown(e);
          }}
          onBlur={() => setPencilFocused(false)}
          onClick={(e) => {
            e.currentTarget.focus();
            focused[cellIndex].current.className = classes.div;
          }}
          ref={focused[cellIndex]}
        >
          {pencilValuesGrid}
        </div>
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange } }) => (
            <TextField
              autoComplete="off"
              inputRef={focused[cellIndex]}
              key={`cell-${cellIndex}`}
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
                if (pencilMode && !disabled && !cellValue && setPencilTrigger)
                  setPencilTrigger((prev) => {
                    let copy = [...prev];
                    copy[cellIndex] = true;
                    return copy;
                  });
                setFocused(cellIndex);
              }}
              onKeyDown={(e) => {
                if (!disabled) {
                  onChange(e);
                }
                onKeyDown(e);
              }}
              className={
                disabled
                  ? `${classes.input} ${classes.disabled}`
                  : classes.input
              }
            />
          )}
        />
      )}
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
    height: "50px",
    position: "relative",
    display: "flex",
    textAlignLast: "center",
    borderWidth: "1px",
    borderColor: "#292838",
    borderStyle: "solid",
    alignItems: "center",
    overflow: "hidden",
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
    height: "-webkit-fill-available",
  },
  div: {
    backgroundColor: `${colors.lightestBlue} !important`,
  },
});

export default SudokuCell;
