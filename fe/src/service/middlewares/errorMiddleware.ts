import { showNotification } from "../../redux/notification/notificationRedux";
import { User } from "../../types/User";
import { Service, SudokuProps } from "../service";
import { AppDispatch } from "../../redux/store";
import { Sudoku } from "../../types/Sudoku";

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
            "Register failed. Check if all data is correct or try a different email or username as it might already be in use.",
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
      console.log(e.message);
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

  public async getAllSudoku(): Promise<Sudoku[]> {
    try {
      return await this.next.getAllSudoku();
    } catch (e) {
      console.log(e);
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

  public async publishSudoku(id: number): Promise<void> {
    try {
      await this.next.publishSudoku(id);
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
}

export default ErrorMiddleware;
