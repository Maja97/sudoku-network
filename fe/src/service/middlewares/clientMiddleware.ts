import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";
import { TokenData } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import {
  Service,
  ServiceNames,
  RequestTypes,
  SudokuProps,
  SudokuFilters,
  UpdateUserInterface,
} from "../service";
import { AppDispatch } from "../../redux/store";
import { removeUser, setUser } from "../../redux/auth/authRedux";
import { User, userFromJSON, userToJSON } from "../../types/User";
import { Sudoku, sudokuFromJSON, sudokuToJSON } from "../../types/Sudoku";
import { setHeaders } from "../axios";

class Client implements Service {
  constructor(
    private clientInstances: {
      [key in ServiceNames]: { [key in RequestTypes]: any };
    },
    private dispatch: AppDispatch
  ) {}

  public async login(email: string, password: string): Promise<string> {
    const res = await this.clientInstances.auth.post("login", {
      email: email,
      password: password,
    });
    if (res) {
      localStorage.setItem(ACCESS_TOKEN, res.token);
      localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
      return res.token;
    }
    return "";
  }

  public async register(user: User, password: string): Promise<void> {
    await this.clientInstances.auth.post("register", {
      ...userToJSON(user),
      password: password,
    });
  }

  public async updateUser(user: UpdateUserInterface): Promise<void> {
    await this.clientInstances.auth.post("updateUser", {
      username: user.username,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      password: user.password,
      oldUsername: user.oldUsername,
    });
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.dispatch(removeUser());
    setHeaders("");
    await this.clientInstances.auth.post("logout", {});
  }

  public async checkToken(): Promise<void> {
    try {
      await this.clientInstances.auth.post("checkToken");
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        const userInfo: TokenData = jwtDecode(token);
        const user = await this.readUserById(userInfo.userID);
        this.dispatch(setUser(user));
      }
    } catch (e) {
      this.dispatch(removeUser());
    }
  }

  public async readUserById(userId: number): Promise<User> {
    const res = await this.clientInstances.users.post("readUserById", {
      userId: userId,
    });

    return userFromJSON(res);
  }

  public async refreshToken(refreshToken: string): Promise<string> {
    const res = await this.clientInstances.auth.post("refreshToken", {
      refreshToken: refreshToken,
    });
    return res.token;
  }

  public async isUnique(props: SudokuProps): Promise<boolean> {
    const res = await this.clientInstances.game.post("isUnique", {
      board: props.board,
      type: props.type,
    });
    return res;
  }

  public async saveSudoku(sudoku: Sudoku): Promise<void> {
    await this.clientInstances.game.post("saveSudoku", {
      ...sudokuToJSON(sudoku),
    });
  }

  public async getAllSudoku(filters?: SudokuFilters): Promise<Sudoku[]> {
    const res = await this.clientInstances.game.post("getAll", { filters });
    return res.map((board: any) => sudokuFromJSON(board));
  }

  public async getUserSudokus(username: string): Promise<Sudoku[]> {
    const res = await this.clientInstances.game.post("getUserSudokus", {
      username,
    });
    return res.map((board: any) => sudokuFromJSON(board));
  }

  public async publishSudoku(id: number, dateTime: string): Promise<void> {
    await this.clientInstances.game.post("publishSudoku", { id, dateTime });
  }

  public async getSudokuById(id: number): Promise<Sudoku> {
    const res = await this.clientInstances.game.post("getSudokuById", { id });
    return sudokuFromJSON(res);
  }

  public async deleteSudoku(id: number, published: number): Promise<void> {
    await this.clientInstances.game.post("deleteSudoku", { id, published });
  }

  public async saveSolved(
    boardId: number,
    username: string,
    time: number,
    rating: number
  ): Promise<void> {
    await this.clientInstances.solved.post("saveSolved", {
      boardId,
      username,
      time,
      rating,
    });
  }

  public async checkAlreadySolved(
    boardId: number,
    username: string
  ): Promise<number> {
    const res = await this.clientInstances.solved.post("checkUserSolved", {
      boardId,
      username,
    });

    return res.time;
  }

  public async getAllSolvedByUser(username: string): Promise<number[]> {
    const res = await this.clientInstances.solved.post("getAllSolvedByUser", {
      username,
    });
    return res;
  }

  public async getSolution(
    board: number[][],
    type: string
  ): Promise<number[][]> {
    const res = await this.clientInstances.game.post("getSolution", {
      board,
      type,
    });
    return res;
  }
}

export default Client;
