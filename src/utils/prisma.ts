import logger from "./logger";
// ** external libraries
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
  errorFormat: "minimal",
});

prismaClient.$on("query", (e) => {
  logger.info(`Query: ${e.query}`);
  logger.info(`Params: ${e.params}`);
  logger.info(`Duration: ${e.duration}ms`);
});

prismaClient.$on("info", (e) => {
  logger.info(e.message);
});

prismaClient.$on("warn", (e) => {
  logger.warn(e.message);
});

prismaClient.$on("error", (e) => {
  logger.error(e.message);
});

export default prismaClient;
