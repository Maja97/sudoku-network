import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";
import { TokenData } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { Service, ServiceNames, RequestTypes } from "../service";
import { AppDispatch } from "../../redux/store";
import { removeUser, setUser } from "../../redux/auth/authRedux";
import { User, userFromJSON, userToJSON } from "../../types/User";

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

  public async logout(): Promise<void> {
    await this.clientInstances.auth.post("logout", {});
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.dispatch(removeUser());
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
}

export default Client;
