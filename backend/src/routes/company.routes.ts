import express from "express";
import multer from "multer";
import { storage } from "../middlewares/uploadImages.js";
import {
  publishGame,
  getMyGames,
  editGame,
  getMySales,
  getMyGamesStats,
} from "../controllers/company.controller.js";

const router = express.Router();

const upload = multer({ storage });
router.post("/games", upload.array("images"), publishGame);
router.get("/games", getMyGames);
router.put("/games/:id", upload.array("images"), editGame);
router.get("/sales", getMySales);
router.get("/games-stats", getMyGamesStats);

export default router;
