import loadingKeys from "../../constants/loading";
import { startLoading, stopLoading } from "../../redux/loading/loadingRedux";
import { AppDispatch } from "../../redux/store";
import { User } from "../../types/User";
import { Service } from "../service";

class LoadingMiddleware implements Service {
  constructor(private next: Service, private dispatch: AppDispatch) {}

  public async login(email: string, password: string): Promise<string> {
    try {
      this.dispatch(startLoading(loadingKeys.LOGIN));
      const res = this.next.login(email, password);
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
}

export default LoadingMiddleware;
