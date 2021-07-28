import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { onTokenNotFound } from "../helpers/auth";
import { goToHomePage, goToLogin } from "../helpers/navigation";
import { showNotification } from "../redux/notification/notificationRedux";
import { RootState } from "../redux/store";
import RegisterScreen from "../screens/RegisterScreen";
import service from "../service/service";
import { User } from "../types/User";

export type RegisterData = {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export const registerFields = {
  email: "email",
  password: "password",
  username: "username",
  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",
};

const RegisterContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const formMethods = useForm<RegisterData>();

  React.useEffect(() => {
    if (user) goToHomePage(history);
  }, [user, history]);

  const onSubmit = React.useCallback(
    async (data: RegisterData) => {
      try {
        const user: User = {
          email: data.email,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        };
        await service
          .register(user, data.password)
          .then(() => {
            dispatch(
              showNotification({
                message: "Register successful. Please log in now.",
                color: "white",
                backgroundColor: "green",
              })
            );
            goToLogin(history);
          })
          .catch((err) => console.log(err));
      } catch (e) {
        onTokenNotFound(dispatch);
      }
    },
    [dispatch, history]
  );

  return (
    <FormProvider {...formMethods}>
      <RegisterScreen handleSubmit={formMethods.handleSubmit(onSubmit)} />
    </FormProvider>
  );
};

export default RegisterContainer;
