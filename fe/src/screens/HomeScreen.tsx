import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Sudoku } from "../types/Sudoku";
import MainButton from "../components/MainButton";
import Navbar from "../components/Navbar";
import ExploreImage from "../assets/svgs/explore_illustration.svg";
import SudokuCard from "../components/SudokuCard";
import SudokuFilters from "../components/SudokuFilters";

interface Props {
  sudoku: Sudoku[];
  onFiltersChange: (key: string, value: string | null) => void;
  onGoToNewSudoku: () => void;
  onGoSolveSudoku: (id: number | undefined) => void;
}

const HomeScreen = ({
  sudoku,
  onFiltersChange,
  onGoToNewSudoku,
  onGoSolveSudoku,
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Navbar pageName="Sudoku Network" />
      <Box px={5} py={5}>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12}>
            <img src={ExploreImage} className={classes.exploreImage} alt="" />
          </Grid>
          <Grid item md={5} sm={9}>
            <Typography className={classes.info}>
              Explore existing Sudoku puzzles, or go and enter your own unique
              puzzle! After you find one, you can publish it for others to see
              and solve.
            </Typography>
            <SudokuFilters onFiltersChange={onFiltersChange} />
          </Grid>
          <Grid item md={4} sm={3}>
            <MainButton
              text="New Sudoku"
              variant="secondary"
              onClick={onGoToNewSudoku}
            />
          </Grid>
          {sudoku.map((item, index) => {
            const source = item.boardImage.toString("base64");
            return (
              <Grid item md={3} sm={4} key={`sudoku-card-home-${index}`}>
                <SudokuCard
                  sudoku={item}
                  image={source}
                  onGoSolveSudoku={onGoSolveSudoku}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  exploreImage: {
    width: "100%",
  },
  info: {
    paddingBottom: 40,
  },
});

export default HomeScreen;
