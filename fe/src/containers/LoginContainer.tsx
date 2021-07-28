import jwtDecode from "jwt-decode";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { onTokenNotFound, TokenData } from "../helpers/auth";
import { goToHomePage } from "../helpers/navigation";
import { setUser } from "../redux/auth/authRedux";
import { RootState } from "../redux/store";
import LoginScreen from "../screens/LoginScreen";
import service from "../service/service";

export type LoginData = {
  email: string;
  password: string;
};

export const loginFields = {
  email: "email",
  password: "password",
};

const LoginContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const formMethods = useForm<LoginData>();

  React.useEffect(() => {
    if (user) goToHomePage(history);
  }, [user, history]);

  const onSubmit = React.useCallback(
    async (data: LoginData) => {
      try {
        const token = await service.login(data.email, data.password);
        const decoded: TokenData = jwtDecode(token);
        const userInfo = await service.readUserById(decoded.userID);
        dispatch(setUser(userInfo));
        goToHomePage(history);
      } catch (e) {
        onTokenNotFound(dispatch);
      }
    },
    [dispatch, history]
  );

  return (
    <FormProvider {...formMethods}>
      <LoginScreen handleSubmit={formMethods.handleSubmit(onSubmit)} />
    </FormProvider>
  );
};

export default LoginContainer;
