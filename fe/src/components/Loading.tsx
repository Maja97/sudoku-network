import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Loading = ({}) => {
  const loading = useSelector((state: RootState) => state.loading);
  return loading && <CircularProgress />;
};

export default Loading;
