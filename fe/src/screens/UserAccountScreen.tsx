import React from "react";
import UserIcon from "../assets/svgs/user_account_illustration.svg";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const UserAccountScreen = () => {
  const classes = useStyles();
  return (
    <Box p={5}>
      <Grid container>
        <Grid item md={7}></Grid>
        <Grid item md={5}>
          <img src={UserIcon} className={classes.image} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles({
  image: {
    width: "-webkit-fill-available",
  },
});
export default UserAccountScreen;
