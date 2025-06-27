import { authService } from "@/api/auth/auth.service";
import { TLoginUserBody } from "@/api/auth/auth.validation";
import { sendResponse } from "@/common/utils/httpHandlers";
import { Request, RequestHandler, Response } from "express";

class AuthController {
  public login: RequestHandler = async (
    req: Request<unknown, any, TLoginUserBody>,
    res: Response
  ) => {
    sendResponse(res, await authService.loginReturnToken(req.body));
  };

  public logout: RequestHandler = async (req: Request, res: Response) => {
    sendResponse(res, await authService.logoutRemoveToken(req.user));
  };
}

export const authController = new AuthController();
