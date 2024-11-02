import { Game } from "../models/game.model.js";
import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest.js";
import { ICompany } from "../interfaces/ICompany.js";
import mongoose from "mongoose";

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

    const game = await Game.create({
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

    const games = await Game.find({ companyId: _id });

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
    const { id: gameId } = req.params;

    if (!gameId) {
      return res.status(400).json({ message: "ID del juego no proporcionado" });
    }

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "ID del juego no válido" });
    }

    const game = await Game.findOne({ _id: gameId, companyId: _id });
    if (!game) {
      return res
        .status(404)
        .json({ message: "Juego no encontrado o no autorizado para editarlo" });
    }

    const updateData = req.body;
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron datos para actualizar" });
    }

    const updatedGame = await Game.findByIdAndUpdate(
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
