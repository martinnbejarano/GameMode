import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    birthday: { type: Date, required: true },
    profilePicture: { type: String, default: null },
    games: [{ type: Schema.Types.ObjectId, ref: "Games", default: [] }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Games", default: [] }],
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model("Users", userSchema);
