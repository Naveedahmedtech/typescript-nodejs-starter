import session from "express-session";

export const sessionHandler = () => {
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); 

  session({
    secret: "s3Cur3",
    name: "sessionId",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate,
    },
  });
};
