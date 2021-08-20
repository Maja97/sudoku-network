import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomModal, { ModalRef } from "../components/CustomModal";
import LocalTextField from "../components/LocalTextField";
import MainButton from "../components/MainButton";
import { CellData } from "../components/SudokuBox";
import SudokuGrid from "../components/SudokuGrid";
import colors from "../constants/colors";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { saveSudokuFields } from "../containers/NewSudokuContainer";
import { saveSudokuRules } from "../helpers/rules";
import { User } from "../types/User";

interface Props {
  data: CellData[][];
  sudokuTypeName: string;
  type: SudokuTypeProps;
  unique: boolean;
  user: User | undefined;
  onTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onCheckUnique: () => void;
  checkConstraints: (value: string, row: number, column: number) => void;
  onSaveSudoku: () => void;
  goToLogin: () => void;
}

const NewSudokuScreen = ({
  data,
  sudokuTypeName,
  type,
  unique,
  user,
  onTypeChange,
  onCheckUnique,
  checkConstraints,
  onSaveSudoku,
  goToLogin,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const modalRef = React.useRef<ModalRef>();
  const {
    formState: { errors },
  } = useFormContext();

  const onSaveSudokuButtonPress = React.useCallback(() => {
    modalRef.current?.openDialog();
  }, []);

  const modalContent = React.useMemo(
    () =>
      user ? (
        <>
          <Typography className={classes.spacing}>Name your Sudoku</Typography>
          <Controller
            defaultValue=""
            name={saveSudokuFields.name}
            rules={saveSudokuRules.rules(t).name}
            render={({ field: { value, onChange } }) => (
              <LocalTextField
                placeholder="Sudoku name (optional)"
                className={classes.spacing}
                name={saveSudokuFields.name}
                value={value}
                onChange={onChange}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Typography className={classes.spacing}>
            If you wish to publish your Sudoku for others to see, check the box
          </Typography>
          <Controller
            defaultValue={false}
            name={saveSudokuFields.publish}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={value}
                    onChange={onChange}
                    disableRipple
                    classes={{ root: classes.checkboxRoot }}
                    icon={<RadioButtonUnchecked className={classes.icon} />}
                    checkedIcon={
                      <CheckCircleOutline className={classes.icon} />
                    }
                  />
                }
                label="Publish Sudoku"
                className={classes.checkboxLabel}
              />
            )}
          />
        </>
      ) : (
        <Typography>
          In order to save and/or publish your Sudoku, you need to be logged in.
        </Typography>
      ),
    [
      errors,
      t,
      classes.checkboxLabel,
      classes.checkboxRoot,
      classes.icon,
      classes.spacing,
      user,
    ]
  );

  const acceptButtonText = React.useMemo(
    () => (user ? "Save Sudoku" : "Login"),
    [user]
  );

  return (
    <Box py={5}>
      <Grid container>
        <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
          <SudokuGrid
            data={data}
            type={type}
            checkConstraints={checkConstraints}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={3}>
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
          {unique && (
            <div>
              <Typography>
                Nice job! The Sudoku you've entered has a unique solution. You
                can save it and publish it if you want to!
              </Typography>
              <MainButton
                className={classes.saveButton}
                type="secondary"
                text="Publish or save Sudoku"
                onClick={onSaveSudokuButtonPress}
              />
            </div>
          )}
        </Grid>
      </Grid>
      <CustomModal
        title="Save your unique Sudoku puzzle"
        ref={modalRef}
        content={modalContent}
        acceptButtonAction={user ? onSaveSudoku : goToLogin}
        acceptButtonText={acceptButtonText}
      />
    </Box>
  );
};

const useStyles = makeStyles({
  button: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  saveButton: {
    marginTop: 30,
  },
  checkboxRoot: {
    backgroundColor: "transparent !important",
  },
  modalInfo: {
    paddingBottom: 25,
  },
  icon: {
    color: colors.purple,
  },
  checkboxLabel: {
    color: "#484848",
  },
  spacing: {
    paddingBottom: 10,
  },
});

export default NewSudokuScreen;
