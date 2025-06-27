import { TLoginUserBody } from "@/api/auth/auth.validation";
import { User, UserModel } from "@/api/user/user.model";
import { HttpError } from "@/common/utils/httpError";
import { signJwt } from "@/common/utils/jwt";
import { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";

export class AuthService {
  async loginReturnToken(
    data: TLoginUserBody
  ): Promise<{ token: string; user: User }> {
    const { username, password } = data;
    const user = await UserModel.findOne({ username }).select("+password");

    if (!user || !(await compare(password, user.password))) {
      throw new Error("Invalid username or password");
    }

    const { token, jti } = signJwt({
      userId: user._id,
      username: user.username,
      name: user.name,
    });

    user.lastJti = jti;
    user.save();

    return {
      token,
      user,
    };
  }

  async logoutRemoveToken(user: User | undefined): Promise<null> {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    user.lastJti = undefined;
    user.save();

    return null;
  }
}

export const authService = new AuthService();
