import { showNotification } from "../../redux/notification/notificationRedux";
import { User } from "../../types/User";
import { Service, SudokuProps } from "../service";
import { AppDispatch } from "../../redux/store";

class ErrorMiddleware implements Service {
  constructor(private next: Service, private dispatch: AppDispatch) {}

  public async login(email: string, password: string): Promise<string> {
    try {
      return this.next.login(email, password);
    } catch (e) {
      this.dispatch(
        showNotification({
          message: "abc",
          color: "red",
          backgroundColor: "blue",
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
      return this.next.logout();
    } catch (e) {
      throw e;
    }
  }

  public async checkToken(): Promise<void> {
    try {
      return this.next.checkToken();
    } catch (e) {
      throw e;
    }
  }

  public async readUserById(userId: number): Promise<User> {
    try {
      return this.next.readUserById(userId);
    } catch (e) {
      throw e;
    }
  }

  public async refreshToken(token: string): Promise<string> {
    try {
      return this.next.refreshToken(token);
    } catch (e) {
      throw e;
    }
  }

  public async isUnique(props: SudokuProps): Promise<number> {
    try {
      return this.next.isUnique(props);
    } catch (e) {
      throw e;
    }
  }
}

export default ErrorMiddleware;
