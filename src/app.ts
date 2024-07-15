import express, { app } from "@/config/express.config";

import { requestLogger } from "@/middlewares/requestLogger";
import { notFoundHandler } from "@/middlewares/notFountHandler";
import { errorHandler } from "@/middlewares/errorHandler";

import routes from '@/routes'

export const createApp = () => {
    app.use(requestLogger);
    app.use(express.json());
    app.use("/api", routes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
