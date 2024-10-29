import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
