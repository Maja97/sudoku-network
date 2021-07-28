import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import MainButton from "../components/MainButton";
import { Typography } from "@material-ui/core";
import fonts from "../constants/fonts";
import images from "../constants/images";
import colors from "../constants/colors";
import cat from "../assets/svgs/playful_cat.svg";
import { RouteNames } from "../routes/routes";
import { Link } from "react-router-dom";

interface Props {
  goToLogin: () => void;
}

const StartScreen = ({ goToLogin }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} px={30}>
      <Box className={classes.content} paddingBottom={3} py={2}>
        <Typography
          noWrap
          variant="h1"
          component="h1"
          className={classes.title}
        >
          Welcome
        </Typography>
        <Typography className={classes.intro}>
          Sudoku network is a place where you can create, check and solve
          various Sudoku puzzles. Once you manage to create a new unique puzzle,
          feel free to share, so others can solve it too.
          <br /> Have fun!
        </Typography>

        <MainButton text="Log in" type="primary" onClick={goToLogin} />
        <Link to={RouteNames.Register} className={classes.continue}>
          Don't have an account? Sign up here
        </Link>

        <img src={cat} className={classes.image} alt="" />

        <Link to={RouteNames.Home} className={classes.continue}>
          Continue as guest
        </Link>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    backgroundImage: `url(${images.yellowBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    overflow: "auto",
    verticalAlign: "center",
  },
  title: {
    fontFamily: fonts.regular,
    color: colors.darkBlueGrey,
    fontSize: 56,
    paddingBottom: "45px",
  },
  content: {
    backgroundColor: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0 0 5px 5px",
    boxShadow: "5px 5px 20px 5px rgba(0,0,0,0.5)",
  },
  image: {
    paddingTop: "50px",
    paddingBottom: "30px",
  },
  continue: {
    color: colors.darkBlueGrey,
    fontFamily: fonts.light,
    paddingTop: "10px",
    textDecoration: "none",
    "&:hover": {
      color: colors.black,
    },
  },
  intro: {
    paddingBottom: "30px",
    width: "60%",
  },
});

export default StartScreen;
