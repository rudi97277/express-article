import { userService } from "@/api/user/user.service";
import { TCreateUserBody, TUserParam } from "@/api/user/user.validation";
import { sendResponse } from "@/common/utils/httpHandlers";
import { Request, RequestHandler, Response } from "express";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    sendResponse(res, await userService.getAllUser());
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const { userId } = req.params as TUserParam;
    sendResponse(res, await userService.getUserById(userId));
  };

  public createUser: RequestHandler = async (
    req: Request<unknown, any, TCreateUserBody>,
    res: Response
  ) => {
    sendResponse(res, await userService.createUser(req.body));
  };

  public updateUser: RequestHandler = async (
    req: Request<unknown, any, TCreateUserBody>,
    res: Response
  ) => {
    const { userId } = req.params as TUserParam;
    sendResponse(res, await userService.updateUser(userId, req.user, req.body));
  };

  public deleteUser: RequestHandler = async (req: Request, res: Response) => {
    const { userId } = req.params as TUserParam;
    sendResponse(res, await userService.deleteUser(userId, req.user));
  };
}

export const userController = new UserController();
