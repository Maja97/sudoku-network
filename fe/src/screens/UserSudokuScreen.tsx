import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";
import SudokuCard from "../components/SudokuCard";
import { Sudoku } from "../types/Sudoku";
import { User } from "../types/User";

interface Props {
  sudoku: Sudoku[];
  user: User | undefined;
  onSudokuPublish: (id: number | undefined) => void;
  onGoSolveSudoku: (id: number | undefined) => void;
}

const UserSudokuScreen = ({
  sudoku,
  user,
  onSudokuPublish,
  onGoSolveSudoku,
}: Props) => {
  return (
    <>
      <Navbar pageName="My Sudoku" />
      <Box px={5} py={5}>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography>
              On this page you can see a list of the unique Sudoku you've found
              and added. If you didn't publish them all, you still can.
            </Typography>
          </Grid>
          {sudoku.map((item, index) => {
            const source = item.boardImage.toString("base64");
            return (
              <Grid item md={3} sm={4} key={`user-sudoku-card${index}`}>
                <SudokuCard
                  sudoku={item}
                  image={source}
                  user={user}
                  onSudokuPublish={onSudokuPublish}
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

export default UserSudokuScreen;
