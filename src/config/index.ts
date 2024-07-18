import { config } from "dotenv";

export const loadEnv = () => {
  process.env.NODE_ENV = process.env.NODE_ENV || "local";
  const ENV_FILE = `.env.${process.env.NODE_ENV}`;
  config({ path: ENV_FILE });
};

