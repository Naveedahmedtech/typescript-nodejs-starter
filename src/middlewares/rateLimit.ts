import { sendErrorResponse } from "@/utils/responseHandler";
import { Request, Response, NextFunction } from "express";
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({ tokensPerInterval: 100, interval: "hour" });

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const remainingRequests = await limiter.removeTokens(1);
    if (remainingRequests < 0) {
      sendErrorResponse(res, "Too many requests, please try again later!", 429);
    }
    next();
  } catch (err) {
    next(err);
  }
};
