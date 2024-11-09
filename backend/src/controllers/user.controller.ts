import { Response } from "express";
import { Types } from "mongoose";
import CustomRequest from "../interfaces/CustomRequest.js";
import { User } from "../models/user.model.js";
import { Games } from "../models/game.model.js";
import { Review } from "../models/comment.model.js";

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

    const game = await Games.findById(id);

    if (!game) {
      return res.status(400).json({ message: "Juego no encontrado" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.wishlist.includes(new Types.ObjectId(id))) {
      return res
        .status(400)
        .json({ message: "El juego ya está en la lista de deseos" });
    }

    game.wishlistCount += 1;
    await game.save();

    user.wishlist.push(new Types.ObjectId(id));
    await user.save();

    res.status(200).json({
      success: true,
      message: "Juego agregado a la lista de deseos",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error en addWishlist:", error);
    res.status(500).json({
      message: "Error al agregar el juego a la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido",
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

    const game = await Games.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!user.wishlist.includes(new Types.ObjectId(id))) {
      return res
        .status(400)
        .json({ message: "El juego no está en la lista de deseos" });
    }

    game.wishlistCount = Math.max(0, game.wishlistCount - 1);
    await game.save();

    user.wishlist = user.wishlist.filter((gameId) => !gameId.equals(id));
    await user.save();

    res.status(200).json({
      success: true,
      message: "Juego eliminado de la lista de deseos",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error en removeFromWishlist:", error);
    res.status(500).json({
      message: "Error al eliminar el juego de la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const user = await User.findById(req.user._id).populate({
      path: "wishlist",
      select: "name price images category platforms",
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error en getWishlist:", error);
    res.status(500).json({
      message: "Error al obtener la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const addReview = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { gameId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user._id;

    if (!gameId || !content || !rating) {
      return res.status(400).json({
        message: "Faltan campos requeridos (gameId, content, rating)",
      });
    }

    if (![1, 2, 3, 4, 5].includes(rating)) {
      return res.status(400).json({
        message: "El rating debe ser un valor entre 1 y 5",
      });
    }

    const game = await Games.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const existingReview = await Review.findOne({
      game: gameId,
      user: userId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "Ya has publicado una review para este juego",
      });
    }

    const review = await Review.create({
      game: gameId,
      user: userId,
      content,
      rating,
    });

    game.reviews.push(review._id);

    const allGameReviews = await Review.find({ game: gameId });
    const averageRating =
      allGameReviews.reduce((acc, rev) => acc + rev.rating, 0) /
      allGameReviews.length;

    game.averageRating = Number(averageRating.toFixed(1));
    await game.save();

    res.status(201).json({
      success: true,
      message: "Review agregada exitosamente",
      data: review,
    });
  } catch (error) {
    console.error("Error en addReview:", error);
    res.status(500).json({
      message: "Error al agregar la review",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
