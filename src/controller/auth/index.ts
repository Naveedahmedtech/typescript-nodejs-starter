import { NextFunction, Request, Response } from "@/config/express.config";
import {
  getGoogleUrl,
  handleGoogleCallback,
  registerUserService,
} from "@/services/auth";
import { CustomError } from "@/utils/CustomError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/utils/responseHandler";

// TODO: INCLUDE REGISTRATION|LOGIN type in db

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await registerUserService(req.body);
    return sendSuccessResponse(
      res,
      "User registered successfully",
      newUser,
      201
    );
  } catch (error: Error | any) {
    // P2002 code for unique fields
    if (error.code === "P2002") {
      const fieldName = error.meta.target[0];
      const err = new CustomError(`${fieldName} has already exists!`, 409);
      next(err);
    }
    next(error);
  }
};

export const registerWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUrl = getGoogleUrl();
    res.redirect(authUrl);
  } catch (error: Error | any) {
    next(error);
  }
};

export const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code as string;
  if (!code) {
    // handle with JOI
    sendErrorResponse(
      res,
      "Code is missing",
      400,
      "Code is missing in the query params"
    );
  }
  try {
    const payload = handleGoogleCallback(code);
    return sendSuccessResponse(
      res,
      "User registered successfully with GOOGLE",
      payload,
      201
    );
  } catch (error: Error | any) {
    next(error);
  }
};
