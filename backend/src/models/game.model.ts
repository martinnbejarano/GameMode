import { Schema, model } from "mongoose";

const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverPicture: { type: String, default: null },
    gallery: [{ type: String, default: [] }],
    price: { type: Number, required: true },
    lenguage: { type: String, required: true },
    platform: {
      type: String,
      enum: ["PC", "Playstation", "Xbox"],
      required: true,
    },
    systemRequirements: {
      OS: { type: String, enum: ["Windows", "MacOS", "Linux"], required: true },
      Processor: { type: String, required: true },
      RAM: { type: String, required: true },
      Storage: { type: String, required: true },
      GraphicCard: { type: String, required: true },
      DirectX: { type: String, required: true },
    },
    releaseDate: { type: Date, required: Date.now },
    developer: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments", default: [] }],
  },
  { timestamps: true }
);

export const Game = model("Games", gameSchema);
