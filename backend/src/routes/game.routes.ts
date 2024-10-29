import express, { RequestHandler } from "express";
import {
  getGames,
  getGameReviews,
  getGameById,
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/", getGames as RequestHandler);
router.get("/:id", getGameById as RequestHandler);
router.get("/:id/reviews", getGameReviews as RequestHandler);

export default router;
