import { env } from "@/common/utils/envConfig";
import pino from "pino";

export const plainLogger = pino({
  enabled: !env.isTest,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: false,
      messageFormat: "{msg}", // only the message
      ignore: "hostname,pid,time,level",
    },
  },
});
