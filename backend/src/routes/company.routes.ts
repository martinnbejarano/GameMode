import express from "express";
import multer from "multer";
import { storage } from "../middlewares/uploadImages.js";
import {
  publishGame,
  getMyGames,
  editGame,
} from "../controllers/company.controller.js";

const router = express.Router();

const upload = multer({ storage });
router.post("/games", upload.array("images"), publishGame);
router.get("/games", getMyGames);
router.put("/games/:gameId", upload.array("images"), editGame);

export default router;
