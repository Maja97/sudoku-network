import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

type buttonType = "primary" | "secondary";

interface Props {
  text: string;
  type?: string;
  onClick: () => void;
}

const MainButton = ({ text, type = "primary", onClick }: Props) => {
  const classes = useStyles();
  return (
    <Button className={classes.button} onClick={onClick}>
      {text}
    </Button>
  );
};

const useStyles = makeStyles({
  button: {
    backgroundColor: "#f6d522",
    borderRadius: "50px",
    padding: "10px 50px",
    fontFamily: fonts.medium,
    fontSize: "16px",
    color: colors.darkBlueGrey,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: colors.darkBlueGrey,
      color: colors.white,
    },
  },
});

export default MainButton;
