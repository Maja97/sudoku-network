import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

type ButtonType = "primary" | "secondary" | "noRadius";

interface Props {
  text: string;
  type?: ButtonType;
  className?: string;
  onClick: () => void;
}

const MainButton = ({ text, type = "primary", className, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Button
      className={`${classes.button} ${classes[type]} ${className}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

const useStyles = makeStyles({
  button: {
    borderRadius: "50px",
    padding: "10px 50px",
    fontFamily: fonts.medium,
    fontSize: "16px",
    textTransform: "capitalize",
  },
  primary: {
    backgroundColor: colors.yellow,
    color: colors.darkBlueGrey,
    "&:hover": {
      backgroundColor: colors.darkBlueGrey,
      color: colors.white,
    },
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.darkBlueGrey,
    "&:hover": {
      backgroundColor: colors.yellow,
      color: colors.darkBlueGrey,
    },
  },
  noRadius: {
    borderRadius: 0,
    padding: 0,
    color: colors.darkPurple,
  },
});

export default MainButton;
