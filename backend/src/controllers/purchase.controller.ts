import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest.js";
import { Purchase } from "../models/purchase.model.js";
import { Games } from "../models/game.model.js";
import { User } from "../models/user.model.js";

export const createPurchase = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { gameId } = req.params;
    const userId = req.user._id;

    const game = await Games.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const purchase = new Purchase({
      game: gameId,
      user: req.user._id,
      company: game.companyId,
      price: game.price,
      purchaseDate: new Date(),
    });

    const user = await User.findByIdAndUpdate(userId, {
      $push: { games: gameId },
    });

    const updatedGame = await Games.findByIdAndUpdate(gameId, {
      $inc: { totalSales: 1 },
    });

    await user?.save();
    await updatedGame?.save();
    await purchase.save();

    res.status(201).json({
      success: true,
      message: "Compra realizada con éxito",
      purchase,
    });
  } catch (error) {
    console.error("Error en createPurchase:", error);
    res.status(500).json({
      message: "Error al procesar la compra",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
