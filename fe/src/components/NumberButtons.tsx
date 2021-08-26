import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

interface Props {
  size: number;
  enterNumber: (number: string) => void;
}

const NumberButtons = ({ size, enterNumber }: Props) => {
  const classes = useStyles();
  return (
    <Grid container>
      {Array.from({ length: size }, (_, i) => i + 1).map((item) => (
        <Grid item md={4}>
          <Button
            className={classes.button}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              enterNumber(item.toString());
            }}
          >
            {item}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles({
  button: {
    backgroundColor: colors.slateGrey,
    width: "inherit",
    height: "65px",
    color: "white",
    marginBottom: 2,
    fontFamily: fonts.bold,
    fontSize: 16,
    "&:hover": {
      backgroundColor: colors.darkSlateGrey,
    },
  },
});

export default NumberButtons;
