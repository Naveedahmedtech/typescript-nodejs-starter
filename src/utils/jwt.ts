import jwt from "jsonwebtoken";

export const createToken = async (data: any, expiry: string | undefined) => {
  return jwt.sign(
    {
      id: data.id,
    },
    process.env.JWT_SECRET || "JWT_SECRET",
    { expiresIn: expiry || "1h" }
  );
};
