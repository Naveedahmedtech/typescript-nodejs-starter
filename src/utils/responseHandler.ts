import { Response } from "@/config/express.config";
import { RESPONSE_CODES } from "@/constants";

export const sendSuccessResponse = (
  res: Response,
  message: string,
  result: any = null,
  statusCode: number = 200,
  code: string = RESPONSE_CODES.SUCCESS
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    code,
    message,
    result,
  });
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  stack: string | null = null,
  errors: string[] = []
) => {
  let code: string;

  switch (statusCode) {
    case 400:
      code = RESPONSE_CODES.BAD_REQUEST;
      break;
    case 401:
      code = RESPONSE_CODES.UNAUTHORIZED;
      break;
    case 403:
      code = RESPONSE_CODES.FORBIDDEN;
      break;
    case 404:
      code = RESPONSE_CODES.NOT_FOUND;
      break;
    case 409:
      code = RESPONSE_CODES.CONFLICT;
      break;
    case 422:
      code = RESPONSE_CODES.UNPROCESSABLE_ENTITY;
      break;
    case 429:
      code = RESPONSE_CODES.TO_MANY_REQUESTS;
      break;
    case 201:
      code = RESPONSE_CODES.CREATED;
      break;
    case 202:
      code = RESPONSE_CODES.ACCEPTED;
      break;
    case 204:
      code = RESPONSE_CODES.NO_CONTENT;
      break;
    case 500:
    default:
      code = RESPONSE_CODES.INTERNAL_SERVER_ERROR;
      break;
  }

  const response: {
    code: string;
    statusCode: number;
    message: string;
    success: boolean;
    errors?: string[];
    stack?: string | null;
  } = {
    success: false,
    statusCode,
    code,
    message,
    errors,
  };

  if (process.env.NODE_ENV !== "prod" && stack) {
    response.stack = stack;
  }

  res.status(statusCode).json(response);
};
