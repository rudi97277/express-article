import { env } from "@/common/utils/envConfig";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export function signJwt(payload: object): { token: string; jti: string } {
  const jti = randomUUID();
  const token = jwt.sign({ ...payload, jti }, env.JWT_SECRET, {
    expiresIn: 60 * env.JWT_EXPIRES_IN_MINUTES,
  });

  return { token, jti };
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, env.JWT_SECRET) as T;
}
