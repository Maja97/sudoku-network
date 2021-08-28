import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

type ButtonVariant = "primary" | "secondary" | "noRadius";
type ButtonType = "submit" | undefined;

interface Props {
  text: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  className?: string;
  startIcon?: JSX.Element;
  preventDefault?: boolean;
  onClick: () => void;
}

const MainButton = ({
  text,
  type,
  variant = "primary",
  className,
  startIcon,
  preventDefault,
  onClick,
}: Props) => {
  const classes = useStyles();

  return (
    <Button
      type={type}
      className={`${classes.button} ${classes[variant]} ${className}`}
      onClick={onClick}
      startIcon={startIcon}
      onMouseDown={(e) => {
        if (preventDefault) e.preventDefault();
      }}
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
