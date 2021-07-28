import { AxiosResponse } from "axios";
import store from "../redux/store";
import { User } from "../types/User";
import AxiosInstance from "./axios";
import Client from "./middlewares/clientMiddleware";
import ErrorMiddleware from "./middlewares/errorMiddleware";
import LoadingMiddleware from "./middlewares/loadingMiddleware";

interface AuthService {
  login(email: string, password: string): Promise<string>;
  register(user: User, password: string): Promise<void>;
  logout(): Promise<void>;
  checkToken(): Promise<void>;
  readUserById(userId: number): Promise<User>;
  refreshToken(refreshToken: string): Promise<string>;
}

export const services = ["auth", "users"];
export type ServiceNames = "auth" | "users";
let service: Service;

const responseBody = (response: AxiosResponse) => response.data;

export const requests = (service: string) => {
  return {
    get: (url: string) =>
      AxiosInstance.get(`${service}/${url}`).then(responseBody),
    post: (url: string, body: Object) =>
      AxiosInstance.post(`${service}/${url}`, body).then(responseBody),
    put: (url: string, body: {}) =>
      AxiosInstance.put(`${service}/${url}`, body).then(responseBody),
    delete: (url: string) =>
      AxiosInstance.delete(`${service}/${url}`).then(responseBody),
  };
};
export type RequestTypes = "get" | "post" | "put" | "delete";
const instances: any = {};

services.forEach((service) => (instances[service] = requests(service)));

export interface Service extends AuthService {}

const client = new Client(instances, store.dispatch);
const errorMiddleware = new ErrorMiddleware(client, store.dispatch);
service = new LoadingMiddleware(errorMiddleware, store.dispatch);
export default service;
