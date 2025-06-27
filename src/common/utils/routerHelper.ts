import { authenticateToken } from "@/common/middleware/authToken";
import { catchAsync } from "@/common/utils/catchAsync";
import {
  validateRequest,
  ValidationSchemaConfig,
} from "@/common/utils/httpHandlers";
import { plainLogger } from "@/common/utils/logger";
import { RequestHandler, Router } from "express";

export type RouterDenifition = {
  method: "get" | "post" | "patch" | "put" | "delete";
  path: string;
  noAuth?: boolean;

  // route can be used with or without auth
  flexAuth?: boolean;
  validator?: ValidationSchemaConfig;
  action: RequestHandler;
};

export const mapRouter = (
  parentRoute: Router,
  childGroup: string,
  childRoute: Router,
  childList: RouterDenifition[]
) => {
  plainLogger.info("\nRegistered routes : ");

  childList.forEach((item) => {
    plainLogger.info(
      `${item.method.toUpperCase().padEnd(6)} ${childGroup}${item.path}`
    );
    var middlewares = [];

    (item.noAuth === undefined || item.noAuth === false) &&
      middlewares.push(
        catchAsync(authenticateToken({ flexAuth: item.flexAuth }))
      );

    item.validator !== undefined &&
      middlewares.push(catchAsync(validateRequest(item.validator)));

    childRoute[item.method](item.path, middlewares, catchAsync(item.action));
  });

  plainLogger.info("\n");

  parentRoute.use(childGroup, childRoute);
};
