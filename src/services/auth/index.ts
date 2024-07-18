import { oauth2Client } from "@/config/google.config";
import { getHashPassword } from "@/utils/hash";
import { createToken } from "@/utils/jwt";
import prismaClient from "@/utils/prisma";

export const registerUserService = async (userData: any) => {
  const { email, password, role } = userData;

  const hashPassword = await getHashPassword(password);

  const user = await prismaClient.user.create({
    data: {
      email,
      password: hashPassword,
      role,
    },
  });

  const accessToken = await createToken(user, process.env.ACCESS_TOKEN_EXPIRY);
  const refreshToken = await createToken(
    user,
    process.env.REFRESH_TOKEN_EXPIRY
  );
  return { accessToken, refreshToken };
};

export const getGoogleUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
};

export const handleGoogleCallback = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: CLIENT_ID,
  });
  return ticket.getPayload();
};
