import { Schema, model } from "mongoose";

const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
      required: true,
    },
    description: { type: String, required: true },
    images: [{ type: String, default: [] }],
    price: { type: Number, required: true },
    languages: {
      type: [String],
      enum: [
        "Español",
        "Inglés",
        "Francés",
        "Italiano",
        "Alemán",
        "Portugués",
        "Japonés",
        "Chino",
        "Coreano",
        "Ruso",
      ],
      required: true,
    },
    platforms: {
      type: [String],
      enum: ["PC", "Playstation", "Xbox", "Nintendo", "VR"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Aventura",
        "Acción",
        "RPG",
        "MOBA",
        "Estrategia",
        "Simulación",
        "Deportes",
        "Terror",
        "Arcade",
        "Carreras",
      ],
      required: true,
    },
    minimumSystemRequirements: {
      OS: { type: String, enum: ["Windows", "MacOS", "Linux"], required: true },
      Processor: { type: String, required: true },
      RAM: { type: String, required: true },
      Storage: { type: String, required: true },
      GraphicCard: { type: String, required: true },
      DirectX: { type: String, required: true },
    },
    recommendedSystemRequirements: {
      OS: { type: String, enum: ["Windows", "MacOS", "Linux"], required: true },
      Processor: { type: String, required: true },
      RAM: { type: String, required: true },
      Storage: { type: String, required: true },
      GraphicCard: { type: String, required: true },
      DirectX: { type: String, required: true },
    },
    releaseDate: { type: Date, required: Date.now },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews", default: [] }],
    totalSales: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Games = model("Games", gameSchema);
