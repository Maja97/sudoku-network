import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { MutableRefObject } from "react";
import Navbar from "../components/Navbar";
import NumberButtons from "../components/NumberButtons";
import { CellData } from "../components/SudokuBox";
import SudokuGrid, { CellRef } from "../components/SudokuGrid";
import fonts from "../constants/fonts";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import CreateIcon from "@material-ui/icons/Create";
import MainButton from "../components/MainButton";
import { msToMinutesAndSeconds } from "../helpers/functions";

interface Props {
  sudoku: CellData[][];
  type: SudokuTypeProps;
  time: string;
  pencilMode: boolean;
  solvedTime: number | undefined;
  focusedRef: MutableRefObject<CellRef | undefined>;
  enterNumber: (number: string) => void;
  togglePencilMode: () => void;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SolveScreen = ({
  sudoku,
  type,
  time,
  focusedRef,
  pencilMode,
  solvedTime,
  enterNumber,
  checkConstraints,
  togglePencilMode,
}: Props) => {
  const classes = useStyles();
  return (
    sudoku && (
      <>
        <Navbar pageName="Solve Sudoku" />
        <Box display="flex" justifyContent="center" py={5} px={2}>
          <Grid container spacing={4}>
            <Grid item md={4}>
              {solvedTime && (
                <Typography>
                  You've already solved this Sudoku. You can do it again, but
                  time will not be measured.
                </Typography>
              )}
            </Grid>
            <Grid
              item
              md={4}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography className={classes.time}>
                {solvedTime
                  ? `Solved in: ${msToMinutesAndSeconds(solvedTime)}`
                  : time}
              </Typography>

              <SudokuGrid
                ref={focusedRef}
                data={sudoku}
                pencilMode={pencilMode}
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
              <div style={{ paddingBottom: 50 }}>
                <Typography>
                  Pencil mode: {pencilMode ? "on" : "off"}
                </Typography>
                <MainButton
                  preventDefault
                  text="Toggle"
                  variant="noRadius"
                  startIcon={<CreateIcon />}
                  onClick={togglePencilMode}
                />
              </div>
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
