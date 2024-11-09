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

    if (user.wishlist.includes(new Types.ObjectId(id))) {
      return res.status(400).json({ message: "El juego ya está en la lista de deseos" });
    }

    game.wishlistCount += 1;
    await game.save();

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

export const removeFromWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { id } = req.params;
    const userId = req.user._id;

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!user.wishlist.includes(new Types.ObjectId(id))) {
      return res.status(400).json({ message: "El juego no está en la lista de deseos" });
    }

    // Decrementar el contador de wishlist del juego
    game.wishlistCount = Math.max(0, game.wishlistCount - 1);
    await game.save();

    // Remover el juego de la wishlist del usuario
    user.wishlist = user.wishlist.filter(gameId => !gameId.equals(id));
    await user.save();

    res.status(200).json({
      success: true,
      message: "Juego eliminado de la lista de deseos",
      wishlist: user.wishlist
    });

  } catch (error) {
    console.error("Error en removeFromWishlist:", error);
    res.status(500).json({
      message: "Error al eliminar el juego de la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

export const getWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        select: 'name price images category platforms'
      });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: user.wishlist
    });

  } catch (error) {
    console.error("Error en getWishlist:", error);
    res.status(500).json({
      message: "Error al obtener la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};