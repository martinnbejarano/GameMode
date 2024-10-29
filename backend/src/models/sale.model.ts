import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  game: { type: Schema.Types.ObjectId, ref: "Games", required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Sale = model("Sales", saleSchema);
