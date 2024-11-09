import express from "express";
import { protectRouteUser } from "../middlewares/protectRoute.js";
import {
  addWishlist,
  removeFromWishlist,
  getWishlist,
  addReview,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/wishlist/:id", protectRouteUser, addWishlist);
router.delete("/wishlist/:id", protectRouteUser, removeFromWishlist);
router.get("/wishlist", protectRouteUser, getWishlist);
router.post("/reviews/:gameId", protectRouteUser, addReview);

export default router;
