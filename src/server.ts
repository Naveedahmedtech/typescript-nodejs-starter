import { loadEnv } from "@/config";
import { createApp } from "@/app";
import logger from "@/utils/logger";

loadEnv();

const app = createApp();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`APP IS RUNNING ON PORT ---> [${PORT}]`);
    });

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception thrown:", error);
      // Application specific logging, throwing an error, or other logic here
      process.exit(1); // Exit process with failure
    });
    // process.on("uncaughtExceptionMonitor", () => {});
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
    });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
