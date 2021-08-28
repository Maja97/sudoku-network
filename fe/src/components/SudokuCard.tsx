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
import { sudokuType } from "../constants/sudokuTypes";
import dayjs from "dayjs";

interface Props {
  sudoku: Sudoku;
  image: string;
  user?: User;
  onOpenDeleteDialog?: (
    id: number | undefined,
    published: number | null
  ) => void;
  onSudokuPublish?: (id: number | undefined) => void;
  onGoSolveSudoku: (id: number | undefined) => void;
}

const SudokuCard = ({
  sudoku,
  image,
  user,
  onOpenDeleteDialog,
  onSudokuPublish,
  onGoSolveSudoku,
}: Props) => {
  const classes = useStyles();
  const type = React.useMemo(
    () =>
      Object.values(sudokuType).find((item) => item.identifier === sudoku.type)
        ?.name,
    [sudoku.type]
  );

  return (
    <>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className={classes.info}>{`Type: ${type}`}</Typography>
            {sudoku.published ? (
              <Typography className={classes.info}>
                {dayjs(sudoku.dateTime).format("DD.MM.YYYY. HH:mm:ss")}
              </Typography>
            ) : null}
          </div>
        </CardContent>
        <CardActions className={classes.button}>
          {user && (
            <MainButton
              text="Delete"
              variant="noRadius"
              onClick={() =>
                onOpenDeleteDialog &&
                onOpenDeleteDialog(sudoku.boardId, sudoku.published)
              }
            />
          )}
          <div>
            {user && !sudoku.published && onSudokuPublish && (
              <MainButton
                text="Publish"
                variant="noRadius"
                onClick={() => onSudokuPublish(sudoku.boardId)}
              />
            )}
            <MainButton
              text="Solve"
              variant="noRadius"
              onClick={() => onGoSolveSudoku(sudoku.boardId)}
            />
          </div>
        </CardActions>
      </Card>
    </>
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
    justifyContent: "space-between",
    display: "flex",
  },

  info: {
    fontSize: 12,
    fontFamily: fonts.lightItalic,
  },
});

export default SudokuCard;
