import { ServiceResponse } from "@/common/utils/serviceResponse";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const unexpectedRequest: RequestHandler = (_req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(
      ServiceResponse.failure(null, "Route not found", StatusCodes.NOT_FOUND)
    );
};

const errorRequest: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || err.status || StatusCodes.BAD_REQUEST;
  let message = err.message || "There is a problem with your request";

  if (err instanceof mongoose.Error.CastError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = `Validation failed: ${errors.join(", ")}`;
  }

  if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate value for field '${field}': ${err.keyValue[field]}`;
  }

  res
    .status(statusCode)
    .send(ServiceResponse.failure(null, message, statusCode));
};

export default (): [RequestHandler, ErrorRequestHandler] => [
  unexpectedRequest,
  errorRequest,
];
