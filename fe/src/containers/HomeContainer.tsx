import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const HomeContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return <div>i</div>;
};

export default HomeContainer;
