import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SudokuFiltersFields } from "../containers/HomeContainer";
import { Controller } from "react-hook-form";

interface Props {
  onFiltersChange: (key: string, value: string | number | null) => void;
}

interface RatingValues {
  [key: string]: number;
}

const ratingValues: RatingValues = {
  "Very easy": 1,
  Easy: 2,
  Medium: 3,
  Hard: 4,
  "Very hard": 5,
  "No rating": 0,
};
const SudokuFilters = ({ onFiltersChange }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item md={6} sm={6}>
        <Controller
          name={SudokuFiltersFields.type}
          defaultValue={null}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              value={value}
              onChange={(_, val) => {
                onChange(val);
                onFiltersChange(SudokuFiltersFields.type, val);
              }}
              options={["Standard", "6x6", "X-Sudoku"]}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Sudoku type" variant="outlined" />
              )}
            />
          )}
        />
      </Grid>
      <Grid item md={6} sm={6}>
        <Controller
          name={SudokuFiltersFields.publishDate}
          defaultValue={null}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              value={value}
              onChange={(_, val) => {
                onChange(val);
                onFiltersChange(SudokuFiltersFields.publishDate, val);
              }}
              options={["This week", "This month", "This year"]}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Publish date"
                  variant="outlined"
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item md={6} sm={6}>
        <Controller
          name={SudokuFiltersFields.rating}
          defaultValue={null}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              value={value}
              onChange={(e, val) => {
                onChange(val);
                onFiltersChange(SudokuFiltersFields.rating, ratingValues[val]);
              }}
              options={Object.keys(ratingValues)}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="User rating" variant="outlined" />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SudokuFilters;
