import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SudokuFiltersFields } from "../containers/HomeContainer";
import { Controller } from "react-hook-form";

interface Props {
  onFiltersChange: (key: string, value: string | null) => void;
}

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
    </Grid>
  );
};

export default SudokuFilters;
