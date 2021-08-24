import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

interface Props {
  size: number;
}

const NumberButtons = ({ size }: Props) => {
  const classes = useStyles();
  return (
    <Grid container>
      {Array.from({ length: size }, (_, i) => i + 1).map((item) => (
        <Grid item md={4}>
          <Button className={classes.button}>{item}</Button>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles({
  button: {
    backgroundColor: colors.lighterBlue,
    height: 70,
    width: 70,
    margin: 2,
    fontFamily: fonts.bold,
    fontSize: 16,
    "&:hover": {
      backgroundColor: colors.lightestBlue,
    },
  },
});

export default NumberButtons;
