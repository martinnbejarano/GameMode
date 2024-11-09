import { Games } from "../models/game.model.js";
import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest.js";
import { ICompany } from "../interfaces/ICompany.js";
import mongoose from "mongoose";
import { Sale } from "../models/sale.model.js";

export const publishGame = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.company) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { _id } = req.company as ICompany;
    const {
      name,
      description,
      price,
      category,
      platforms,
      languages,
      minimumSystemRequirements,
      recommendedSystemRequirements,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !platforms ||
      !languages ||
      !minimumSystemRequirements ||
      !recommendedSystemRequirements
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const imagesPath = Array.isArray(req.files)
      ? req.files.map((file: Express.Multer.File) => file.filename)
      : [];

    const parsedPlatforms = JSON.parse(platforms);
    const parsedLanguages = JSON.parse(languages);
    const minReqs = JSON.parse(minimumSystemRequirements);
    const recReqs = JSON.parse(recommendedSystemRequirements);

    if (!Array.isArray(parsedPlatforms) || !Array.isArray(parsedLanguages)) {
      return res.status(400).json({
        message: "Los campos platforms y languages deben ser arrays",
      });
    }

    const game = await Games.create({
      name,
      description,
      price,
      companyId: _id,
      images: imagesPath,
      category,
      platforms: parsedPlatforms,
      languages: parsedLanguages,
      releaseDate: new Date(),
      minimumSystemRequirements: minReqs,
      recommendedSystemRequirements: recReqs,
    });

    res.status(201).json(game);
  } catch (error) {
    console.error("Error en publishGame:", error);
    res.status(500).json({ message: "Error al publicar el juego", error });
  }
};

export const getMyGames = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.company as ICompany;

    const games = await Games.find({ companyId: _id });

    res.status(200).json({
      success: true,
      data: games,
      count: games.length,
    });
  } catch (error) {
    console.error("Error en getMyGames:", error);
    res.status(500).json({
      message: "Error al obtener los juegos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const editGame = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.company as ICompany;
    const gameId = req.params.id;

    if (!gameId) {
      return res.status(400).json({ message: "ID del juego no proporcionado" });
    }

    const updateData = {
      ...req.body,
      platforms: JSON.parse(req.body.platforms),
      languages: JSON.parse(req.body.languages),
      minimumSystemRequirements: JSON.parse(req.body.minimumSystemRequirements),
      recommendedSystemRequirements: JSON.parse(
        req.body.recommendedSystemRequirements
      ),
    };

    const updatedGame = await Games.findByIdAndUpdate(
      gameId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedGame,
    });
  } catch (error) {
    console.error("Error en editGame:", error);
    res.status(500).json({
      message: "Error al editar el juego",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getMySales = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.company as ICompany;

    const companyGames = await Games.find({ companyId: _id }, "_id");
    const gameIds = companyGames.map((game) => game._id);

    const sales = await Sale.find({ game: { $in: gameIds } })
      .populate("game", "name price")
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: sales,
      count: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + sale.price, 0),
    });
  } catch (error) {
    console.error("Error en getMySales:", error);
    res.status(500).json({
      message: "Error al obtener las ventas",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getMyGamesStats = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.company as ICompany;

    const games = await Games.find({
      companyId: new mongoose.Types.ObjectId(_id),
    })
      .select("_id name totalSales views wishlistCount price")
      .lean();

    if (!games || games.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          games: [],
          totals: {
            totalRevenue: 0,
            totalSales: 0,
            totalViews: 0,
            totalWishlists: 0,
          },
        },
      });
    }

    const gamesStats = games.map((game) => ({
      _id: game._id,
      name: game.name,
      revenue: (game.totalSales || 0) * (game.price || 0),
      totalSales: game.totalSales || 0,
      views: game.views || 0,
      wishlistCount: game.wishlistCount || 0,
      conversionRate: game.views
        ? (((game.totalSales || 0) / game.views) * 100).toFixed(2)
        : "0",
    }));

    const totals = {
      totalRevenue: gamesStats.reduce(
        (sum, game) => sum + (game.revenue || 0),
        0
      ),
      totalSales: gamesStats.reduce(
        (sum, game) => sum + (game.totalSales || 0),
        0
      ),
      totalViews: gamesStats.reduce((sum, game) => sum + (game.views || 0), 0),
      totalWishlists: gamesStats.reduce(
        (sum, game) => sum + (game.wishlistCount || 0),
        0
      ),
    };

    res.status(200).json({
      success: true,
      data: {
        games: gamesStats,
        totals,
      },
    });
  } catch (error) {
    console.error("Error en getMyGamesStats:", error);
    res.status(500).json({
      message: "Error al obtener las estadísticas de los juegos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
