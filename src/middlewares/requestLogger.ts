import { NextFunction, Request, Response } from "@/config/express.config";
import logger from "@/utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.table(`Request method: ${req.method} || Request origin: ${req.url}`);
  logger.info(`${req.method} ${req.url}`);
  next();
};
