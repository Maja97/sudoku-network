import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/auth";
import { Dispatch } from "redux";
import { removeUser } from "../redux/auth/authRedux";
import { setHeaders } from "../service/axios";

export interface TokenData {
  sub: string;
  userID: number;
}

export const onTokenSuccess = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  console.log(token, "on token success");
  setHeaders(token);
};

export const onTokenNotFound = (dispatch: Dispatch<any>) => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  dispatch(removeUser());
};
