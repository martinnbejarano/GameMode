import express from "express";
import { protectRouteUser } from "../middlewares/protectRoute.js";
import {
  addWishlist,
  removeFromWishlist,
  getWishlist,
  addReview,
  getMyGames,
  addToCart,
  removeFromCart,
  getCart,
  removeFromGames,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/wishlist/:id", protectRouteUser, addWishlist);
router.delete("/wishlist/:id", protectRouteUser, removeFromWishlist);
router.get("/wishlist", protectRouteUser, getWishlist);
router.post("/reviews/:gameId", protectRouteUser, addReview);
router.get("/games", protectRouteUser, getMyGames);
router.post("/cart/:id", protectRouteUser, addToCart);
router.delete("/cart/:id", protectRouteUser, removeFromCart);
router.get("/cart", protectRouteUser, getCart);
router.delete("/games/:id", protectRouteUser, removeFromGames);
export default router;
