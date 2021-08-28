import loadingKeys from "../../constants/loading";
import { startLoading, stopLoading } from "../../redux/loading/loadingRedux";
import { AppDispatch } from "../../redux/store";
import { Sudoku } from "../../types/Sudoku";
import { User } from "../../types/User";
import { Service, SudokuFilters, SudokuProps } from "../service";

class LoadingMiddleware implements Service {
  constructor(private next: Service, private dispatch: AppDispatch) {}

  public async login(email: string, password: string): Promise<string> {
    try {
      this.dispatch(startLoading(loadingKeys.LOGIN));
      const res = await this.next.login(email, password);
      this.dispatch(stopLoading(loadingKeys.LOGIN));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.LOGIN));
      throw e;
    }
  }

  public async register(user: User, password: string): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.REGISTER));
      await this.next.register(user, password);
      this.dispatch(stopLoading(loadingKeys.REGISTER));
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.REGISTER));
      throw e;
    }
  }

  public async logout(): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.LOGOUT));
      const res = await this.next.logout();
      this.dispatch(stopLoading(loadingKeys.LOGOUT));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.LOGOUT));
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
      this.dispatch(startLoading(loadingKeys.UNIQUE));
      const res = await this.next.isUnique(props);
      this.dispatch(stopLoading(loadingKeys.UNIQUE));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.UNIQUE));
      throw e;
    }
  }

  public async saveSudoku(sudoku: Sudoku): Promise<void> {
    try {
      await this.next.saveSudoku(sudoku);
      this.dispatch(stopLoading(loadingKeys.SAVE_SUDOKU));
    } catch (e) {
      console.log(e, "error in loading middleware");
      this.dispatch(stopLoading(loadingKeys.SAVE_SUDOKU));
      throw e;
    }
  }

  public async getAllSudoku(filters?: SudokuFilters): Promise<Sudoku[]> {
    try {
      this.dispatch(startLoading(loadingKeys.GET_ALL_SUDOKU));
      const res = await this.next.getAllSudoku(filters);
      this.dispatch(stopLoading(loadingKeys.GET_ALL_SUDOKU));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.GET_ALL_SUDOKU));
      throw e;
    }
  }

  public async getUserSudokus(username: string): Promise<Sudoku[]> {
    try {
      this.dispatch(startLoading(loadingKeys.GET_USER_SUDOKU));
      const res = await this.next.getUserSudokus(username);
      this.dispatch(stopLoading(loadingKeys.GET_USER_SUDOKU));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.GET_USER_SUDOKU));
      throw e;
    }
  }

  public async publishSudoku(id: number, dateTime: string): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.PUBLISH_SUDOKU));
      await this.next.publishSudoku(id, dateTime);
      this.dispatch(stopLoading(loadingKeys.PUBLISH_SUDOKU));
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.PUBLISH_SUDOKU));
      throw e;
    }
  }

  public async getSudokuById(id: number): Promise<Sudoku> {
    try {
      this.dispatch(startLoading(loadingKeys.GET_SUDOKU_BY_ID));
      const res = await this.next.getSudokuById(id);
      this.dispatch(stopLoading(loadingKeys.GET_SUDOKU_BY_ID));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.GET_SUDOKU_BY_ID));
      throw e;
    }
  }

  public async deleteSudoku(id: number, published: number): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.DELETE_SUDOKU));
      const res = await this.next.deleteSudoku(id, published);
      this.dispatch(stopLoading(loadingKeys.DELETE_SUDOKU));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.DELETE_SUDOKU));
      throw e;
    }
  }

  public async saveSolved(
    boardId: number,
    username: string,
    time: number
  ): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.SAVE_SOLVED_SUDOKU));
      const res = await this.next.saveSolved(boardId, username, time);
      this.dispatch(stopLoading(loadingKeys.SAVE_SOLVED_SUDOKU));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.SAVE_SOLVED_SUDOKU));
      throw e;
    }
  }

  public async checkAlreadySolved(
    boardId: number,
    username: string
  ): Promise<number> {
    try {
      this.dispatch(startLoading(loadingKeys.CHECK_ALREADY_SOLVED));
      const res = await this.next.checkAlreadySolved(boardId, username);
      this.dispatch(stopLoading(loadingKeys.CHECK_ALREADY_SOLVED));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.CHECK_ALREADY_SOLVED));
      throw e;
    }
  }
}

export default LoadingMiddleware;
