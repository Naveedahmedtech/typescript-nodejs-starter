import { OAuth2Client } from "google-auth-library";
import { loadEnv } from "@/config";

loadEnv();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET_ID;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
export const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
