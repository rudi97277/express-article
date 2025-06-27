import { User, UserModel } from "@/api/user/user.model";
import { TCreateUserBody } from "@/api/user/user.validation";
import { hashString } from "@/common/utils/hash";
import { HttpError } from "@/common/utils/httpError";
import { StatusCodes } from "http-status-codes";

export class UserService {
  async getAllUser(): Promise<User[]> {
    return await UserModel.find({}, { __v: 0 });
  }

  async createUser(data: TCreateUserBody): Promise<User> {
    return await UserModel.create({
      name: data.name,
      username: data.username,
      password: hashString(data.password),
    });
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ _id: id }, { __v: 0 });

    if (user === null) {
      throw new HttpError("User not found", StatusCodes.NOT_FOUND);
    }

    return user;
  }

  async updateUser(
    userId: string,
    user: User | undefined,
    data: TCreateUserBody
  ): Promise<User | null> {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
    if (userId !== (user.id || user._id)) {
      throw new HttpError("Can only update yourself", StatusCodes.BAD_REQUEST);
    }

    return await UserModel.findByIdAndUpdate(
      userId,
      {
        name: data.name,
        username: data.username,
        password: hashString(data.password),
      },
      {
        new: true,
      }
    );
  }

  async deleteUser(
    userId: string,
    user: User | undefined
  ): Promise<User | null> {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
    if (userId !== user.id) {
      throw new HttpError("Can only delete yourself", StatusCodes.BAD_REQUEST);
    }

    return await UserModel.findByIdAndDelete(userId);
  }
}

export const userService = new UserService();
