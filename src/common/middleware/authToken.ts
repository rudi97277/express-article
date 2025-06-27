import { User, UserModel } from "@/api/user/user.model";
import { env } from "@/common/utils/envConfig";
import { HttpError } from "@/common/utils/httpError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  username: string;
  jti: string;
  iat?: number;
  exp?: number;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

type AuthenticateTokenOption = {
  //allow route can be used with or without auth
  flexAuth?: boolean;
};

export const authenticateToken = (option?: AuthenticateTokenOption) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (option?.flexAuth && !authHeader) {
      return next();
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      const user = await UserModel.findById(decoded.userId);
      if (!user || user.lastJti !== decoded.jti) {
        throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } catch (err) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
  };
};
