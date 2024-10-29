import { Request, Response } from "express";
import { Game } from "../models/game.model.js";

export const getGames = async (_req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const game = await Game.findById(id);
  res.status(200).json(game);
};

export const getGameReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await Game.find({ gameId: id }, { reviews: 1 }).populate(
    "reviews"
  );
  res.status(200).json(reviews);
};
