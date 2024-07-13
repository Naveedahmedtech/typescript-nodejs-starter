import { Response } from "@/config/express.config";
export const sendSuccessResponse = (
  res: Response,
  message: string,
  result: any = null,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    code: statusCode,
    message,
    success: true,
    result,
  });
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  stack: string | null = null
) => {
  const response: {
    code: number;
    message: string;
    success: boolean;
    stack?: string | null;
  } = {
    code: statusCode,
    message,
    success: false,
  };

  if (process.env.NODE_ENV !== "prod" && stack) {
    response.stack = stack;
  }

  res.status(statusCode).json(response);
};
