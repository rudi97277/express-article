import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { connectMongo } from "@/common/utils/db";
import { env } from "@/common/utils/envConfig";
import routes from "@/routes";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import pino from "pino";

const app = express();

//connect mongo
connectMongo();
const logger = pino({ name: "server start", enabled: env.isTest });

// trust reverse proxy
app.set("trust proxy", true);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) =>
      !origin ||
      env.CORS_ORIGINS.includes("*") ||
      env.CORS_ORIGINS.includes(origin)
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS")),
    credentials: true,
  })
);
app.use(helmet());
app.use(rateLimiter);

// logging
if (!env.isTest) app.use(requestLogger);

// route
app.use("/", routes);

// error handler
app.use(errorHandler());

export { app, logger };
