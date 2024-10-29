import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  game: { type: Schema.Types.ObjectId, ref: "Games", required: true },
  content: { type: String, required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Review = model("Reviews", reviewSchema);
