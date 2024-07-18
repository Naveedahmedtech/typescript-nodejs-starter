import Joi from "joi";

const passwordComplexity = Joi.string()
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    )
  )
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain min 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: passwordComplexity,
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password and confirm password must match",
      "any.required": "Confirm password cannot be empty",
    }),
  role: Joi.string().valid("USER").required().messages({
    "any.only": "Role must be 'USER'",
    "any.required": "Role cannot be empty",
  }),
  postman_key: Joi.string().valid("DISABLE_RECAPTCHA").optional().messages({
    "any.only": "INVALID KEY PASSED",
  }),
});
