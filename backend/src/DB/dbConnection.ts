import mongoose from "mongoose";
import { envConfig } from "../utils/env.config.js";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(envConfig.DB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error db connection", (error as Error).message);
  }
};
