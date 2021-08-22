import loadingKeys from "../../constants/loading";
import { startLoading, stopLoading } from "../../redux/loading/loadingRedux";
import { AppDispatch } from "../../redux/store";
import { Sudoku } from "../../types/Sudoku";
import { User } from "../../types/User";
import { Service, SudokuProps } from "../service";

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

  public async saveSudoku(sudoku: Sudoku, published: boolean): Promise<void> {
    try {
      this.dispatch(startLoading(loadingKeys.SAVE_SUDOKU));
      await this.next.saveSudoku(sudoku, published);
      this.dispatch(stopLoading(loadingKeys.SAVE_SUDOKU));
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.SAVE_SUDOKU));
      throw e;
    }
  }

  public async getAllSudoku(): Promise<any> {
    try {
      this.dispatch(startLoading(loadingKeys.GET_ALL_SUDOKU));
      const res = await this.next.getAllSudoku();
      this.dispatch(stopLoading(loadingKeys.GET_ALL_SUDOKU));
      return res;
    } catch (e) {
      this.dispatch(stopLoading(loadingKeys.GET_ALL_SUDOKU));
      throw e;
    }
  }
}

export default LoadingMiddleware;
