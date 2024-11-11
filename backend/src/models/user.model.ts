import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    birthday: { type: Date, required: true },
    profilePicture: { type: String, default: null },
    games: [{ type: Schema.Types.ObjectId, ref: "Games", default: [] }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Games" }],
    cart: [{ type: Schema.Types.ObjectId, ref: "Games" }],
    resetPasswordToken: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = model("Users", userSchema);
