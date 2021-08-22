import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Sudoku } from "../types/Sudoku";
import MainButton from "../components/MainButton";
import fonts from "../constants/fonts";
import colors from "../constants/colors";
import Navbar from "../components/Navbar";
import ExploreImage from "../assets/svgs/explore_illustration.svg";

interface Props {
  sudoku: Sudoku[];
  onGoToNewSudoku: () => void;
}

const HomeScreen = ({ sudoku, onGoToNewSudoku }: Props) => {
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
            <Typography>
              Explore existing Sudoku puzzles, or go and enter your own unique
              puzzle! After you find one, you can publish it for others to see
              and solve.
            </Typography>
          </Grid>
          <Grid item md={4} sm={3}>
            <MainButton
              text="New Sudoku"
              type="secondary"
              onClick={onGoToNewSudoku}
            />
          </Grid>
          {sudoku.map((item) => {
            const source = item.boardImage.toString("base64");
            return (
              <Grid item md={3} sm={4}>
                <Card>
                  <CardContent>
                    <Box className={classes.sudokuInfo}>
                      <Typography className={classes.sudokuName}>
                        {`#${item.boardId}`}
                      </Typography>
                      <Typography className={classes.sudokuNameTitle}>
                        Sudoku name:
                      </Typography>
                      <Typography className={classes.sudokuName}>
                        {item.boardName ? item.boardName : `-`}
                      </Typography>
                    </Box>
                    <img className={classes.sudokuImage} src={source} alt="" />
                  </CardContent>
                  <CardActions className={classes.button}>
                    <MainButton
                      text="Solve"
                      type="noRadius"
                      onClick={() => console.log(item.boardId)}
                    />
                  </CardActions>
                </Card>
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
  sudokuImage: {
    width: "-webkit-fill-available",
  },
  sudokuInfo: {
    paddingBottom: 15,
  },
  sudokuName: {
    fontSize: 14,
    fontFamily: fonts.light,
  },
  sudokuNameTitle: {
    color: colors.darkPurple,
  },
  button: {
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
