import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";
import { ServiceResponse } from "./serviceResponse";

export type ValidationSchemaConfig = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};
export const validateRequest =
  (schemas: ValidationSchemaConfig) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const c = await schemas.params?.parseAsync(req.params);
      await Promise.all([
        schemas.params?.parseAsync(req.params),
        schemas.body?.parseAsync(req.body),
        schemas.query?.parseAsync(req.query),
      ]);
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors
        .map((e) => `${e.path.join(".")} ${e.message}`)
        .join(", ")}`;
      const statusCode = StatusCodes.BAD_REQUEST;
      const serviceResponse = ServiceResponse.failure(
        null,
        errorMessage,
        statusCode
      );
      res.status(serviceResponse.statusCode).send(serviceResponse);
    }
  };

export function sendResponse<T>(res: Response, data: T, message?: string) {
  const serviceResponse = ServiceResponse.success(data, message, 200);

  res.status(serviceResponse.statusCode).send(serviceResponse);
}
