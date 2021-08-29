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
import fonts from "../constants/fonts";
import { Sudoku } from "../types/Sudoku";
import MainButton from "./MainButton";
import colors from "../constants/colors";
import { User } from "../types/User";
import { sudokuType } from "../constants/sudokuTypes";
import Rating from "@material-ui/lab/Rating";

interface Props {
  sudoku: Sudoku;
  image: string;
  user?: User;
  onOpenDeleteDialog?: (
    id: number | undefined,
    published: number | null
  ) => void;
  avgRating?: number;
  onSudokuPublish?: (id: number | undefined) => void;
  onGoSolveSudoku: (id: number | undefined) => void;
}

const SudokuCard = ({
  sudoku,
  image,
  user,
  avgRating,
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
            <div>
              <Typography className={classes.sudokuName}>
                {`#${sudoku.boardId}`}
              </Typography>
              <Typography className={classes.sudokuNameTitle}>
                Sudoku name:
              </Typography>
              <Typography className={classes.sudokuName}>
                {sudoku.boardName ? sudoku.boardName : `-`}
              </Typography>
            </div>
            <div>
              {avgRating && (
                <Rating
                  value={avgRating}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              )}
              {sudoku.solved && (
                <Typography className={classes.solved}>Solved</Typography>
              )}
            </div>
          </Box>
          <img className={classes.sudokuImage} src={image} alt="" />
          <Grid container>
            <Grid item md={5}>
              <Typography
                className={classes.info}
              >{`Type: ${type}`}</Typography>
            </Grid>
            <Grid item md={7}>
              {sudoku.username ? (
                <div>
                  <Typography className={classes.addedBy}>Added by</Typography>
                  <Typography className={classes.user}>
                    {sudoku.username}
                  </Typography>
                </div>
              ) : (
                <Typography className={classes.addedBy}>
                  Auto-generated
                </Typography>
              )}
            </Grid>
          </Grid>
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
    display: "flex",
    justifyContent: "space-between",
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
    fontSize: 14,
    fontFamily: fonts.lightItalic,
  },
  solved: {
    fontSize: 12,
    fontFamily: fonts.extraLight,
    textAlign: "right",
  },
  user: {
    fontSize: 12,
    fontFamily: fonts.extraLight,
    overflowWrap: "break-word",
    textAlign: "right",
  },
  addedBy: {
    fontSize: 12,
    fontFamily: fonts.lightItalic,
    textAlign: "right",
  },
});

export default SudokuCard;
