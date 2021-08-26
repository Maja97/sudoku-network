import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { MutableRefObject } from "react";
import Navbar from "../components/Navbar";
import NumberButtons from "../components/NumberButtons";
import { CellData } from "../components/SudokuBox";
import SudokuGrid, { CellRef } from "../components/SudokuGrid";
import fonts from "../constants/fonts";
import { SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  sudoku: CellData[][];
  type: SudokuTypeProps;
  time: string;
  focusedRef: MutableRefObject<CellRef | undefined>;
  enterNumber: (number: string) => void;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SolveScreen = ({
  sudoku,
  type,
  time,
  focusedRef,
  enterNumber,
  checkConstraints,
}: Props) => {
  const classes = useStyles();
  return (
    sudoku && (
      <>
        <Navbar pageName="Solve Sudoku" />
        <Box display="flex" justifyContent="center" py={5}>
          <Grid container spacing={4}>
            <Grid item md={4}></Grid>
            <Grid
              item
              md={4}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography className={classes.time}>{time}</Typography>

              <SudokuGrid
                ref={focusedRef}
                data={sudoku}
                checkConstraints={checkConstraints}
                type={type}
              />
            </Grid>
            <Grid
              item
              md={2}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NumberButtons size={type.size} enterNumber={enterNumber} />
            </Grid>
          </Grid>
        </Box>
      </>
    )
  );
};

const useStyles = makeStyles({
  time: {
    fontFamily: fonts.black,
    fontSize: 16,
    paddingBottom: 20,
  },
});

export default SolveScreen;
