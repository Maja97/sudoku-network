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
import CustomModal, { ModalRef } from "../components/CustomModal";
import Rating from "@material-ui/lab/Rating";
import { Controller } from "react-hook-form";
import { ratingFields } from "../containers/SolveContainer";

const labels: { [index: string]: string } = {
  1: "Very easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Very hard",
};

interface Props {
  sudoku: CellData[][];
  type: SudokuTypeProps;
  time: string;
  pencilMode: boolean;
  solvedTime: number | undefined;
  focusedRef: MutableRefObject<CellRef | undefined>;
  goBackEnabled: boolean;
  modalRef: MutableRefObject<ModalRef | undefined>;
  saveSolved: () => void;
  goToHomepage: () => void;
  enterNumber: (number: string) => void;
  togglePencilMode: () => void;
  checkConstraints: (value: string, row: number, column: number) => void;
}

const SolveScreen = ({
  sudoku,
  type,
  time,
  focusedRef,
  modalRef,
  pencilMode,
  solvedTime,
  goBackEnabled,
  enterNumber,
  goToHomepage,
  saveSolved,
  checkConstraints,
  togglePencilMode,
}: Props) => {
  const classes = useStyles();
  const [rating, setRating] = React.useState<number | null>(3);
  const [hover, setHover] = React.useState(-1);
  const modalContent = React.useMemo(() => {
    return (
      <div className={classes.rating}>
        <Controller
          defaultValue={3}
          name={ratingFields.stars}
          render={({ field: { value, onChange } }) => (
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                onChange(event);
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          )}
        />
        {rating !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
        )}
      </div>
    );
  }, [hover, rating, classes.rating]);

  return (
    sudoku && (
      <>
        <Navbar pageName="Solve Sudoku" />
        <Box display="flex" justifyContent="center" py={5} px={2}>
          <Grid container spacing={4}>
            <Grid item md={3}>
              {solvedTime && (
                <Typography className={classes.alreadySolved}>
                  You've already solved this Sudoku. You can do it again, but
                  time will not be measured.
                </Typography>
              )}
              {goBackEnabled && (
                <MainButton
                  onClick={goToHomepage}
                  text="Go back"
                  variant="secondary"
                />
              )}
            </Grid>
            <Grid
              item
              md={5}
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
        <CustomModal
          title="Rate Sudoku complexity"
          cancelDisabled
          ref={modalRef}
          content={modalContent}
          acceptButtonAction={saveSolved}
          acceptButtonText="Save"
        />
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
  alreadySolved: {
    paddingBottom: 25,
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
});

export default SolveScreen;
