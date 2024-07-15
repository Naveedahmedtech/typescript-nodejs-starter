import express, { app } from "@/config/express.config";

// ** middlewares
import { requestLogger } from "@/middlewares/requestLogger";
import { notFoundHandler } from "@/middlewares/notFountHandler";
import { errorHandler } from "@/middlewares/errorHandler";

import { rateLimiterMiddleware } from "@/middlewares/rateLimit";
// ** routes
import routes from "@/routes";

// ** external libraries
import helmet from "helmet";
import session from "express-session";
import { sessionHandler } from "./middlewares/sessionHandler";

export const createApp = () => {
  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(sessionHandler);
  app.use(rateLimiterMiddleware);
  app.use("/api", routes);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
};
