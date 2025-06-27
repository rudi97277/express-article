import { StatusCodes } from "http-status-codes";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;

  private constructor(
    success: boolean,
    message: string,
    responseObject: T,
    statusCode: number
  ) {
    this.success = success;
    this.message = message;
    this.data = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(
    data: T,
    message: string = "Request success",
    statusCode: number = StatusCodes.OK
  ) {
    return new ServiceResponse(true, message, data, statusCode);
  }

  static failure<T>(
    data: T,
    message: string = "Request failed",
    statusCode: number = StatusCodes.BAD_REQUEST
  ) {
    return new ServiceResponse(false, message, data, statusCode);
  }
}
