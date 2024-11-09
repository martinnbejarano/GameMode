import { Request, Response } from "express";
import { Game } from "../models/game.model.js";

export const getGames = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, minRating } = req.query;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }
    console.log(query);
    const games = await Game.find(query);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    // Incrementar el contador de visualizaciones
    game.views += 1;
    await game.save();

    res.status(200).json(game);
  } catch (error) {
    console.error("Error en getGameById:", error);
    res.status(500).json({
      message: "Error al obtener el juego",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

export const getGameReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await Game.find({ gameId: id }, { reviews: 1 }).populate(
    "reviews"
  );
  res.status(200).json(reviews);
};
