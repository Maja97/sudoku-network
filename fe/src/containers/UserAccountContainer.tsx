import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { showNotification } from "../redux/notification/notificationRedux";
import { RootState } from "../redux/store";
import UserAccountScreen from "../screens/UserAccountScreen";
import service from "../service/service";

export const userAccountFields = {
  firstName: "firstName",
  lastName: "lastName",
  password: "password",
  username: "username",
  email: "email",
};

export type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
};

const UserAccountContainer = () => {
  const formMethods = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(
    async (data: UserData) => {
      if (user)
        service
          .updateUser({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            username: data.username,
            oldUsername: user?.username,
          })
          .then((res) => {
            dispatch(
              showNotification({
                message: "Successfully updated!",
                color: "black",
                backgroundColor: colors.green,
              })
            );
          })
          .catch((e) => console.log(e));
    },
    [user, dispatch]
  );

  return user ? (
    <FormProvider {...formMethods}>
      <UserAccountScreen
        user={user}
        handleSubmit={formMethods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  ) : null;
};
export default UserAccountContainer;
