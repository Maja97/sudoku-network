import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import fonts from "../constants/fonts";
import { Sudoku } from "../types/Sudoku";
import MainButton from "./MainButton";
import colors from "../constants/colors";
import { User } from "../types/User";

interface Props {
  sudoku: Sudoku;
  image: string;
  user?: User;
  onSudokuPublish?: (id: number | undefined) => void;
}

const SudokuCard = ({ sudoku, image, user, onSudokuPublish }: Props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Box className={classes.sudokuInfo}>
          <Typography className={classes.sudokuName}>
            {`#${sudoku.boardId}`}
          </Typography>
          <Typography className={classes.sudokuNameTitle}>
            Sudoku name:
          </Typography>
          <Typography className={classes.sudokuName}>
            {sudoku.boardName ? sudoku.boardName : `-`}
          </Typography>
        </Box>
        <img className={classes.sudokuImage} src={image} alt="" />
      </CardContent>
      <CardActions className={classes.button}>
        {user && !sudoku.published && onSudokuPublish && (
          <MainButton
            text="Publish"
            type="noRadius"
            onClick={() => onSudokuPublish(sudoku.boardId)}
          />
        )}
        <MainButton
          text="Solve"
          type="noRadius"
          onClick={() => console.log(sudoku.boardId)}
        />
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  sudokuInfo: {
    paddingBottom: 15,
  },
  sudokuName: {
    fontSize: 14,
    fontFamily: fonts.light,
  },
  sudokuImage: {
    width: "-webkit-fill-available",
  },
  sudokuNameTitle: {
    color: colors.darkPurple,
  },
  button: {
    justifyContent: "flex-end",
  },
});

export default SudokuCard;
