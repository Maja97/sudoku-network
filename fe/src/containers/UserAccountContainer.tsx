import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserAccountScreen from "../screens/UserAccountScreen";

const UserAccountContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return <UserAccountScreen />;
};
export default UserAccountContainer;
