import axios, { AxiosResponse } from "axios";
import { REFRESH_TOKEN } from "../constants/auth";
import { onTokenNotFound, onTokenSuccess } from "../helpers/auth";
import store from "../redux/store";
import service from "./service";

const AxiosInstance = axios.create({
  timeout: 15000,
});

AxiosInstance.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    if (response.data?.error === "-1") {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        const accessToken = await service
          .refreshToken(refreshToken)
          .catch((error) => {
            onTokenNotFound(store.dispatch);
          });
        if (accessToken) {
          onTokenSuccess(accessToken);
          return response;
        }
        onTokenNotFound(store.dispatch);
        return response;
      }
      onTokenNotFound(store.dispatch);
      return response;
    }

    return response;
  }
);

export const setHeaders = (token: string) => {
  AxiosInstance.interceptors.request.use((config) => {
    if (token !== "") config.headers.Authorization = "Bearer " + token;
    else delete config.headers.Authorization;
    return config;
  });
};

export default AxiosInstance;
