import { AxiosResponse } from "axios";
import { SudokuTypeProps } from "../constants/sudokuTypes";
import store from "../redux/store";
import { Sudoku } from "../types/Sudoku";
import { User } from "../types/User";
import AxiosInstance from "./axios";
import Client from "./middlewares/clientMiddleware";
import ErrorMiddleware from "./middlewares/errorMiddleware";
import LoadingMiddleware from "./middlewares/loadingMiddleware";

export interface SudokuProps {
  board: number[][];
  count: number;
  type: SudokuTypeProps;
  row: number;
  col: number;
}

export interface SudokuFilters {
  type: string | null;
  publishDate: string | null;
}

interface AuthService {
  login(email: string, password: string): Promise<string>;
  register(user: User, password: string): Promise<void>;
  logout(): Promise<void>;
  checkToken(): Promise<void>;
  refreshToken(refreshToken: string): Promise<string>;
}

interface UsersService {
  readUserById(userId: number): Promise<User>;
}

interface GameService {
  isUnique(props: SudokuProps): Promise<boolean>;
  saveSudoku(sudoku: Sudoku): Promise<void>;
  getAllSudoku(filters?: SudokuFilters): Promise<Sudoku[]>;
  getUserSudokus(username: string): Promise<Sudoku[]>;
  getSudokuById(id: number): Promise<Sudoku>;
  publishSudoku(id: number, dateTime: string): Promise<void>;
  deleteSudoku(id: number, published: number | null): Promise<void>;
}

interface SolvedService {
  saveSolved(boardId: number, username: string, time: number): Promise<void>;
  checkAlreadySolved(boardId: number, username: string): Promise<number>;
}

export const services = ["auth", "users", "game", "solved"];
export type ServiceNames = "auth" | "users" | "game" | "solved";
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

export interface Service
  extends AuthService,
    UsersService,
    GameService,
    SolvedService {}

const client = new Client(instances, store.dispatch);
const errorMiddleware = new ErrorMiddleware(client, store.dispatch);
service = new LoadingMiddleware(errorMiddleware, store.dispatch);
export default service;
