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
  InputLabel,
} from "@material-ui/core";
import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React, { MutableRefObject } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomModal, { ModalRef } from "../components/CustomModal";
import LocalTextField from "../components/LocalTextField";
import MainButton from "../components/MainButton";
import { CellData } from "../components/SudokuBox";
import SudokuGrid, { CellRef } from "../components/SudokuGrid";
import colors from "../constants/colors";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import { saveSudokuFields } from "../containers/NewSudokuContainer";
import { saveSudokuRules } from "../helpers/rules";
import { User } from "../types/User";
import newSudokuImage from "../assets/svgs/new_sudoku_illustration.svg";
import Navbar from "../components/Navbar";
import NumberButtons from "../components/NumberButtons";

interface Props {
  data: CellData[][];
  sudokuTypeName: string;
  type: SudokuTypeProps;
  unique: boolean;
  imageRef: any;
  user: User | undefined;
  modalRef: MutableRefObject<ModalRef | undefined>;
  focusedRef: MutableRefObject<CellRef | undefined>;
  onTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onCheckUnique: () => void;
  checkConstraints: (value: string, row: number, column: number) => void;
  onSaveSudoku: () => void;
  goToLogin: () => void;
  enterNumber: (number: string) => void;
}

const NewSudokuScreen = ({
  data,
  sudokuTypeName,
  type,
  unique,
  user,
  imageRef,
  modalRef,
  focusedRef,
  onTypeChange,
  onCheckUnique,
  checkConstraints,
  onSaveSudoku,
  goToLogin,
  enterNumber,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    formState: { errors },
  } = useFormContext();

  const onSaveSudokuButtonPress = React.useCallback(() => {
    modalRef.current?.openDialog();
  }, [modalRef]);

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
    <>
      <Navbar pageName="Add new Sudoku" />
      <Box py={5} px={5}>
        <Grid container spacing={4}>
          <Grid item md={2} className={classes.numberButtons}>
            <NumberButtons enterNumber={enterNumber} size={type.size} />
          </Grid>
          <Grid
            item
            lg={5}
            md={7}
            sm={10}
            xs={12}
            className={classes.gridContainer}
          >
            <SudokuGrid
              ref={focusedRef}
              imageRef={imageRef}
              data={data}
              type={type}
              checkConstraints={checkConstraints}
            />
            {unique && (
              <div className={classes.unique}>
                <Typography>
                  Nice job! The Sudoku you've entered has a unique solution. You
                  can save it and publish it if you want to!
                </Typography>
                <MainButton
                  className={classes.saveButton}
                  variant="secondary"
                  text="Publish or save Sudoku"
                  onClick={onSaveSudokuButtonPress}
                />
              </div>
            )}
          </Grid>
          <Grid item lg={1} md={undefined} sm={undefined} xs={undefined}></Grid>
          <Grid item lg={3} md={4} sm={12} style={{ alignItems: "start" }}>
            <FormControl classes={{ root: classes.formControl }}>
              <InputLabel shrink>Sudoku type</InputLabel>
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

            <img
              src={newSudokuImage}
              style={{ width: "-webkit-fill-available" }}
              alt=""
            />
          </Grid>
          <Grid item md={2} sm={undefined}></Grid>
        </Grid>
        <CustomModal
          title="Save your unique Sudoku puzzle"
          ref={modalRef}
          content={modalContent}
          acceptButtonAction={user ? onSaveSudoku : goToLogin}
          acceptButtonText={acceptButtonText}
        />
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    paddingTop: 45,
    paddingBottom: 40,
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
  formControl: {
    minWidth: 150,
  },
  unique: {
    width: "80%",
    paddingTop: 20,
    textAlign: "center",
  },
  numberButtons: {
    alignSelf: "center",
  },
});

export default NewSudokuScreen;
