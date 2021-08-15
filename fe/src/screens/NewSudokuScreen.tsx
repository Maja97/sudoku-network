import {
  Box,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import MainButton from "../components/MainButton";
import { CellProps } from "../components/SudokuBox";
import SudokuGrid from "../components/SudokuGrid";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";

interface Props {
  data: CellProps[][];
  sudokuTypeName: string;
  type: SudokuTypeProps;
  onTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onCheckUnique: () => void;
}

const NewSudokuScreen = ({
  data,
  sudokuTypeName,
  type,
  onTypeChange,
  onCheckUnique,
}: Props) => {
  const classes = useStyles();

  return (
    <Box py={5}>
      <Grid container>
        <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
          <SudokuGrid data={data} type={type} />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <FormControl variant="outlined">
            <div>Sudoku type</div>
            <Select value={sudokuTypeName} onChange={onTypeChange}>
              {Object.values(sudokuType).map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className={classes.button}>
            <MainButton
              text="Check for unique solution"
              onClick={onCheckUnique}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles({
  button: {
    paddingTop: 20,
  },
});

export default NewSudokuScreen;
