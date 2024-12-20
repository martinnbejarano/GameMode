import { Request, Response } from "express";
import { Games } from "../models/game.model.js";
import { Review } from "../models/comment.model.js";

export const getGames = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, minRating, language, os } = req.query;

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

    if (language) {
      query.languages = language;
    }

    if (os) {
      query["minimumSystemRequirements.OS"] = os;
    }

    console.log(query);
    const games = await Games.find(query);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await Games.findById(id);

    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    console.log("+1 view");
    game.views += 1;
    await game.save();

    res.status(200).json(game);
  } catch (error) {
    console.error("Error en getGameById:", error);
    res.status(500).json({
      message: "Error al obtener el juego",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getGameReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const game = await Games.findById(id).populate("companyId", "name");
    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Juego no encontrado",
      });
    }

    const reviews = await Review.find({ game: id })
      .populate("user", "username profilePicture")
      .populate({
        path: "game",
        select: "name companyId",
        populate: {
          path: "companyId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
      company: game.companyId,
    });
  } catch (error) {
    console.error("Error en getGameReviews:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las reviews",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
