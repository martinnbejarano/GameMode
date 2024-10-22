import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const companySchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    games: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Games",
      default: [],
    },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Company = model("Companies", companySchema);
