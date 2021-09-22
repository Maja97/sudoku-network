import { showNotification } from "../../redux/notification/notificationRedux";
import { User } from "../../types/User";
import {
  Service,
  SudokuFilters,
  SudokuProps,
  UpdateUserInterface,
} from "../service";
import { AppDispatch } from "../../redux/store";
import { Sudoku } from "../../types/Sudoku";
import colors from "../../constants/colors";

class ErrorMiddleware implements Service {
  constructor(private next: Service, private dispatch: AppDispatch) {}

  public async login(email: string, password: string): Promise<string> {
    try {
      return await this.next.login(email, password);
    } catch (e) {
      this.dispatch(
        showNotification({
          message: "Login failed, try again",
          color: "white",
          backgroundColor: "red",
        })
      );
      throw e;
    }
  }

  public async register(user: User, password: string): Promise<void> {
    try {
      await this.next.register(user, password);
    } catch (e) {
      this.dispatch(
        showNotification({
          message:
            "Register failed. Email or username might already be in use.",
          color: "white",
          backgroundColor: "red",
        })
      );
      throw e;
    }
  }

  public async updateUser(user: UpdateUserInterface): Promise<void> {
    try {
      await this.next.updateUser(user);
    } catch (e) {
      this.dispatch(
        showNotification({
          message: "Could not update user info. Try again later.",
          color: "white",
          backgroundColor: "red",
        })
      );
      throw e;
    }
  }

  public async logout(): Promise<void> {
    try {
      return await this.next.logout();
    } catch (e) {
      throw e;
    }
  }

  public async checkToken(): Promise<void> {
    try {
      return await this.next.checkToken();
    } catch (e) {
      throw e;
    }
  }

  public async readUserById(userId: number): Promise<User> {
    try {
      return await this.next.readUserById(userId);
    } catch (e) {
      throw e;
    }
  }

  public async refreshToken(token: string): Promise<string> {
    try {
      return await this.next.refreshToken(token);
    } catch (e) {
      throw e;
    }
  }

  public async isUnique(props: SudokuProps): Promise<boolean> {
    try {
      return await this.next.isUnique(props);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async saveSudoku(sudoku: Sudoku): Promise<void> {
    try {
      await this.next.saveSudoku(sudoku);
    } catch (e) {
      console.log(e, "erorr in middleware");
      this.dispatch(
        showNotification({
          message: "Could not save Sudoku",
          color: "white",
          backgroundColor: "red",
        })
      );
      throw e;
    }
  }

  public async getAllSudoku(filters?: SudokuFilters): Promise<Sudoku[]> {
    try {
      return await this.next.getAllSudoku(filters);
    } catch (e) {
      this.dispatch(
        showNotification({
          message: e.response.data.message,
          color: colors.black,
          backgroundColor: colors.red,
        })
      );
      throw e;
    }
  }

  public async getUserSudokus(username: string): Promise<Sudoku[]> {
    try {
      return await this.next.getUserSudokus(username);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async publishSudoku(id: number, dateTime: string): Promise<void> {
    try {
      await this.next.publishSudoku(id, dateTime);
    } catch (e) {
      throw e;
    }
  }

  public async getSudokuById(id: number): Promise<Sudoku> {
    try {
      return await this.next.getSudokuById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async deleteSudoku(id: number, published: number): Promise<void> {
    try {
      return await this.next.deleteSudoku(id, published);
    } catch (e) {
      throw e;
    }
  }

  public async saveSolved(
    boardId: number,
    username: string,
    time: number,
    rating: number
  ): Promise<void> {
    try {
      await this.next.saveSolved(boardId, username, time, rating);
    } catch (e) {
      throw e;
    }
  }

  public async checkAlreadySolved(
    boardId: number,
    username: string
  ): Promise<number> {
    try {
      return await this.next.checkAlreadySolved(boardId, username);
    } catch (e) {
      throw e;
    }
  }

  public async getAllSolvedByUser(username: string): Promise<number[]> {
    try {
      return await this.next.getAllSolvedByUser(username);
    } catch (e) {
      throw e;
    }
  }

  public async getSolution(
    board: number[][],
    type: string
  ): Promise<number[][]> {
    try {
      return await this.next.getSolution(board, type);
    } catch (e) {
      throw e;
    }
  }
}

export default ErrorMiddleware;
