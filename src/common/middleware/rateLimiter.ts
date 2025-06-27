import { env } from "@/common/utils/envConfig";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import type { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.RATE_LIMIT_MAX,
  message: (_req: Request, res: Response) =>
    res
      .status(StatusCodes.TOO_MANY_REQUESTS)
      .send(
        ServiceResponse.failure(
          null,
          "Too many requests",
          StatusCodes.TOO_MANY_REQUESTS
        )
      ),
  standardHeaders: true,
  windowMs: 1000 * env.RATE_LIMIT_WINDOW_SECOND,
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
