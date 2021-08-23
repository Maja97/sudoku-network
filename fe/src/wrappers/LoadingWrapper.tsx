import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import colors from "../constants/colors";

const LoadingWrapper = ({ children }: any) => {
  const loading = useSelector((state: RootState) => state.loading);
  const classes = useClasses();

  const isLoading = React.useMemo(() => Object.keys(loading), [loading]);
  return (
    <Box>
      <Box
        className={isLoading.length !== 0 ? classes.loading : classes.hidden}
      >
        <CircularProgress className={classes.spinner} />
      </Box>
      {children}
    </Box>
  );
};

const useClasses = makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "auto",
    height: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  hidden: {
    display: "none",
  },
  spinner: {
    color: colors.black,
  },
});

export default LoadingWrapper;
