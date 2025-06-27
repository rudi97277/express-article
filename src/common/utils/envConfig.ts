import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  HOST: z.string().min(1).default("0.0.0.0"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().url().startsWith("mongodb"),
  CORS_ORIGINS: z
    .string()
    .nonempty()
    .transform((v) => v.split(",").map((s) => s.trim()))
    .pipe(z.array(z.string().url())),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(1000),
  RATE_LIMIT_WINDOW_SECOND: z.coerce.number().int().positive().default(60),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN_MINUTES: z.coerce.number().int().positive().default(60),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === "development",
  isProduction: parsedEnv.data.NODE_ENV === "production",
  isTest: parsedEnv.data.NODE_ENV === "test",
};
