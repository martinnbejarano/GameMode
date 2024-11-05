import { Response } from 'express';
import { Types } from 'mongoose';
import CustomRequest from "../interfaces/CustomRequest.js";
import { User } from '../models/user.model.js';
import { Game } from '../models/game.model.js';

export const addWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { id } = req.params;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "ID del juego no proporcionado" });
    }

    const game = await Game.findById(id);
    
    if (!game) {
      return res.status(400).json({ message: "Juego no encontrado" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el juego ya está en la lista de deseos
    if (user.wishlist.includes(new Types.ObjectId(id))) {
      return res.status(400).json({ message: "El juego ya está en la lista de deseos" });
    }

    // Agregar el juego a la lista de deseos
    user.wishlist.push(new Types.ObjectId(id));
    await user.save();

    res.status(200).json({
      success: true,
      message: "Juego agregado a la lista de deseos",
      wishlist: user.wishlist
    });

  } catch (error) {
    console.error("Error en addWishlist:", error);
    res.status(500).json({
      message: "Error al agregar el juego a la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};