import { Request, Response, NextFunction } from '@/config/express.config';
import { CustomError } from "@/utils/CustomError";
import logger from "@/utils/logger";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError("Request not found!", 404);

  logger.warn(error.message, { statusCode: error.statusCode });

  next(error);
};
