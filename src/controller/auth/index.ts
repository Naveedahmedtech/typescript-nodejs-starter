import { NextFunction, Request, Response } from "@/config/express.config";
import { registerUserService } from "@/services/auth";
import { sendSuccessResponse } from "@/utils/responseHandler";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await registerUserService(req.body);
    sendSuccessResponse(res, "User registered successfully", newUser, 201);
  } catch (error) {
    next(error);
  }
};
