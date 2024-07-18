import { Request, Response, NextFunction } from "@/config/express.config";
import { CustomError } from "@/utils/CustomError";
import logger from "@/utils/logger";
import { sendErrorResponse } from "@/utils/responseHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message =
    err instanceof CustomError ? err.message : "INTERNAL SERVER ERROR!";

  logger.error(message, { statusCode, stack: err.stack });

  const response = {
    status: statusCode,
    message,
    ...(process.env.NODE_ENV !== "prod" && {}),
  };
  let stack = err.stack;
  if (process.env.NODE_ENV === "prod") {
    stack = "";
  }

  sendErrorResponse(res, message, statusCode, stack);
};
